const jwt = require("jsonwebtoken");
const JsonWebTokenError = require("jsonwebtoken/lib/JsonWebTokenError");

const {
  AuthError,
  GraphQlDumpWarning,
  UserNotFound,
} = require("./errors");

/**
 * Gets the calling user's data (id, type, status, flags, iat) by their Authorization
 * JavaScript Web Token.
 * Does not hit the database and costs almost nothing to perform.
 * @param ctx
 * @returns {{id, type, status, flags, iat}}
 * @throws AuthError
 */
function getAuthTokenData(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");

    try {
      return jwt.verify(token, process.env.APP_SECRET);
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new AuthError();
      }
      throw e; // Some other error
    }
  }
  throw new AuthError();
}


/**
 * Get user details by UserId. This function can expose sensitive user information so call it
 * only in authorized situations.
 * IT DOES NOT CHECK AUTHORIZATION.
 * @param ctx
 * @param userId
 * @param fields
 * @returns User
 * @throws UserNotFound
 */
async function getUserData(ctx, userId, fields) {
  const user = await ctx.db.query.user({ where: { id: userId } }, fields);
  if (user) {
    return user;
  }

  throw new UserNotFound(userId);
}


/**
 * Get user details by an array of UserIds. This function can expose sensitive user information
 * so call it only in authorized situations.
 * IT DOES NOT CHECK AUTHORIZATION.
 * @param ctx
 * @param userIds
 * @param fields
 * @returns [User]!
 */
async function getUsersData(ctx, userIds, fields) {
  const whereClause = {
    where: {
      OR: [],
    },
  };
  whereClause.where.OR = userIds.map(userId => ({ id: userId }));

  const users = await ctx.db.query.users(whereClause, fields);
  if (users) {
    return users;
  }

  throw new UserNotFound(`(all of this list: ${userIds.join(", ")})`);
}


/**
 * Grab fields from a user by their id. If the calling user is the target (they're performing an
 * action on their own account, typically) save a wasteful query.
 * IT DOES NOT CHECK AUTHORIZATION.
 * @param ctx
 * @param targetId
 * @param fields
 * @returns {Promise<{callingUserData: *, targetUserData: *}>}
 */
async function targetStudentDataHelper(ctx, targetId, fields) {
  const callingUserTokenData = getAuthTokenData(ctx); // User must be logged in.
  const callingUserData = await getUserData(ctx, callingUserTokenData.id, fields);

  // If assigning self save a step; we already have the data.
  const targetUserData = callingUserTokenData.id === targetId ?
    callingUserData :
    await getUserData(ctx, targetId, fields);

  return { callingUserData, targetUserData };
}


/**
 * Set a status for a list of courses by their ID.
 * @param ctx
 * @param courseIds
 * @param status
 * @returns {Promise<*>}
 */
async function setStatusForCourses(ctx, courseIds, status) {
  if (!Array.isArray(courseIds) || courseIds.length < 1) {
    throw new GraphQlDumpWarning("mutation", "setStatusForCourses");
  }
  const mutationClause = {
    where: {
      OR: courseIds.map(courseId => ({ id: courseId })),
    },
    data: {
      status,
    },
  };

  return ctx.db.mutation.updateManyCourses(mutationClause, "{ count }");
}


/**
 * Check the auth of a calling user's request with various options. It uses JWT data payload
 * to get the calling user's type, status, and flags.
 * NOTE: If you make changes to this you should also STRONGLY consider making the changes to the
 * client's checkAuth function located in client/src/utils.js.
 * @param ctx
 * @param permissions
 * - type         Mixed, can be an int (MINIMUM user type allowed), an array of APPROVED
 *                  user types, or null, indicating that anonymous requests are welcome.
 *                  "Why support anonymous?" you ask, "Just don't have an auth check for requests
 *                  that are public!" I have this because running this function before each request
 *                  can still allow me to reject banned users just to be spiteful. >:)
 *                  If simply the user must be logged in just set to USER_TYPE_STUDENT.
 * - status       Mixed, can be an int (MAXIMUM status value allowed) or an array of
 *                  approved statuses. If null will allow any value
 * - flagExclude  Int, pass bitwise flags that are NOT allowed. Leave null to ignore.
 * - flagRequire  Int, include bitwise flags that are REQUIRED. Leave null to ignore.
 * - action       String, optional descriptive text that will display in the AuthError message.
 *                  Example, if you pass "query teachersList" the error could say:
 *                  "Not authorized to query teachersList. Reason: User type '0' insufficient."
 * @returns {*}|Null Returns calling User ID, type, status, and flags if logged in inside an object.
 *                   Returns null if logged out (when logged-out users are allowed).
 * @throws AuthError If there is ever a problem this gets thrown.
 */
async function checkAuth(
  ctx,
  permissions = {
    type: null,
    status: null,
    flagExclude: null,
    flagRequire: null,
    action: null,
  },
) {
  let callingUserData = null;

  try {
    callingUserData = getAuthTokenData(ctx);
  } catch (e) {
    // If the user is not recognized an AuthError will have been thrown
    if (e instanceof AuthError) {
      // The type is explicitly null (indicating anonymous requests are welcome)
      if (permissions.type === null) {
        return null;
      }

      // Throw a slightly more detailed error.
      throw new AuthError("User must be logged in.", permissions.action);
    }
    throw e;  // Some other error
  }

  // This is how we track in what ways the user is rejected if they are rejected.
  let approval = true;
  const rejectionReasons = [];

  // Check type. If null, do not check anything.
  if (Array.isArray(permissions.type)) {
    if (!permissions.type.includes(callingUserData.type)) {
      approval = false;
      rejectionReasons.push(`User type '${callingUserData.type}' not allowed.`);
    }
  } else if (Number.isInteger(permissions.type)) {
    if (callingUserData.type < permissions.type) {
      approval = false;
      rejectionReasons.push(`User type '${callingUserData.type}' not allowed.`);
    }
  }

  // Check status. If null, do not check anything.
  if (Array.isArray(permissions.status)) {
    if (permissions.status.indexOf(callingUserData.status) === -1) {
      approval = false;
      rejectionReasons.push(`User status '${callingUserData.status}' not allowed.`);
    }
  } else if (Number.isInteger(permissions.status)) {
    if (callingUserData.status > permissions.status) {
      approval = false;
      rejectionReasons.push(`User status '${callingUserData.status}' not allowed.`);
    }
  }

  // Check flags (excluded flags)
  if (permissions.flagExclude) {
    if (callingUserData.flags & permissions.flagExclude) {
      approval = false;
      rejectionReasons.push("User has been flagged and is not allowed to perform this action.");
    }
  }

  // Check flags (required flags)
  if (permissions.flagRequire) {
    if ((callingUserData.flags & permissions.flagRequire) !== permissions.flagRequire) {
      approval = false;
      rejectionReasons.push("User lacks specific flag(s) and is not allowed to perform this action.");
    }
  }

  // If it user was rejected for any reason explain it.
  if (!approval) {
    throw new AuthError(rejectionReasons.join(" "), permissions.action);
  }

  return callingUserData;
}


/**
 * "Truthy Zero".
 * Makes the number 0 cast to true. Ints and Floats both work.
 * @param input
 * @returns {boolean}
 */
function t0(input) {
  return !!(input || input === 0);
}

module.exports = {
  getAuthTokenData,
  getUserData,
  getUsersData,
  targetStudentDataHelper,
  setStatusForCourses,
  checkAuth,
  t0,
};
