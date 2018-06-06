/* eslint-disable no-bitwise */

const jwt = require("jsonwebtoken");
const {
  AuthError,
  UserNotFound,
} = require("./errors");
const {
  COURSE_STATUS_ACTIVE,
} = require("./constants");


/**
 * Gets the calling user's ID by their Authorization JavaScript Web Token.
 * Does not hit the database and costs almost nothing to perform.
 * @param ctx
 * @returns {*}
 * @throws AuthError
 */
function getUserId(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
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
 * @returns {*}
 * @throws UserNotFound
 */
async function getUserData(ctx, userId, fields) {
  const user = await ctx.db.query.user({ where: { userId } }, fields);
  if (user) {
    return user;
  }

  throw new UserNotFound(userId);
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
  const callingUserId = getUserId(ctx); // User must be logged in.
  const callingUserData = await getUserData(ctx, callingUserId, fields);

  // If assigning self save a step; we already have the data.
  const targetUserData = callingUserId === targetId ?
    callingUserData :
    await getUserData(ctx, targetId, fields);

  return { callingUserData, targetUserData };
}


/**
 * Convenience function that grabs the newest active course belonging to the student.
 * If the student doesn't have an active course returns null. Else, returns the course ID.
 * IT DOES NOT CHECK AUTHORIZATION.
 * @param ctx
 * @param studentId
 * @returns String|Null
 * @throws Exception
 */
async function getStudentActiveCourseId(ctx, studentId) {
  const userData = await getUserData(
    ctx,
    studentId,
    `{
      enrollment {
        courses( where: {
          status: ${COURSE_STATUS_ACTIVE}
        }, first: 1) {
          id
        }
      }
    }`,
  );

  try {
    return userData.enrollment.courses[0].id;
  } catch (e) {
    if (e instanceof TypeError) {
      return null;  // The user doesn't have an active course
    }
    throw e;
  }
}


/**
 * Check the auth of a calling user's request with various options.
 * @param ctx
 * @param typeCheck - Mixed, can be an int (MINIMUM user type allowed), an array of APPROVED
 *                  user types, or null, indicating that anonymous requests are welcome.
 *                  "Why support anonymous?" you ask, "Just don't have an auth check for requests
 *                  that are public!" I have this because running this function before each request
 *                  can still allow me to reject banned users just to be spiteful. >:)
 *                  If simply the user must be logged in just set to 0.
 * @param statusCheck - Mixed, can be an int (MAXIMUM status value allowed) or an array of
 *                  approved statuses. If null will allow any value
 * @param flagExcludeCheck - Int, pass bitwise flags that are NOT allowed. Leave null to ignore.
 * @param flagIncludeCheck - Int, include bitwise flags that are REQUIRED. Leave null to ignore.
 * @returns {*}|Null Returns calling User ID, type, status, and flags if logged in.
 *                   Null if logged out (when logged-out users are allowed).
 * @throws AuthError If there is ever a problem this gets thrown.
 */
async function checkAuth(
  ctx,
  typeCheck = null,
  statusCheck = null,
  flagExcludeCheck = null,
  flagIncludeCheck = null,
) {
  let callingUserId = "";

  try {
    callingUserId = getUserId(ctx);
  } catch (e) {
    // If the user is not recognized an AuthError will have been thrown
    if (e instanceof AuthError) {
      // The typeCheck is explicitly null (indicating anonymous requests are welcome)
      if (typeCheck === null) {
        return null;
      }

      // Throw a slightly more detailed error.
      throw new AuthError("User must be logged in.");
    } else {
      throw e;  // Some other error
    }
  }

  // At this point user id will be defined, let's grab their type, status, and flags.
  const callingUserData = await getUserData(ctx, callingUserId, "{ type, status, flags }");

  // This is how we track in what ways the user is rejected if they are rejected.
  let approval = true;
  const rejectionReasons = [];

  // Check type. If null, do not check anything.
  if (Array.isArray(typeCheck)) {
    if (typeCheck.indexOf(callingUserData.type) === -1) {
      approval = false;
      rejectionReasons.push(`User type "${callingUserData.type}" disallowed.`);
    }
  } else if (Number.isInteger(typeCheck)) {
    if (callingUserData.type < typeCheck) {
      approval = false;
      rejectionReasons.push(`User type "${callingUserData.type}" insufficient.`);
    }
  }

  // Check status. If null, do not check anything.
  if (Array.isArray(statusCheck)) {
    if (statusCheck.indexOf(callingUserData.status) === -1) {
      approval = false;
      rejectionReasons.push(`User status "${callingUserData.status}" disallowed.`);
    }
  } else if (Number.isInteger(statusCheck)) {
    if (callingUserData.status < statusCheck) {
      approval = false;
      rejectionReasons.push(`User status "${callingUserData.status}" insufficient.`);
    }
  }

  // Check flags (excluded flags)
  if (flagExcludeCheck) {
    if (callingUserData.flags & flagExcludeCheck) {
      approval = false;
      rejectionReasons.push("User marked with disallowed flags.");
    }
  }

  // Check flags (required flags)
  if (flagIncludeCheck) {
    if ((callingUserData.flags & flagIncludeCheck) !== flagIncludeCheck) {
      approval = false;
      rejectionReasons.push("User not marked with required flags.");
    }
  }

  // If it user was rejected for any reason explain it.
  if (!approval) {
    throw new AuthError(rejectionReasons.join(" "));
  }

  return {
    id: callingUserId,
    type: callingUserData.type,
    status: callingUserData.status,
    flags: callingUserData.flags,
  };
}

module.exports = {
  getUserId,
  getUserData,
  targetStudentDataHelper,
  getStudentActiveCourseId,
  checkAuth,
};
