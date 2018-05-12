const jwt = require("jsonwebtoken");

function getUserId(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

// Get user details by UserId. This function can expose sensitive user information so call it
// only in authorized situations. It does not check authorization.
async function getUserData(ctx, id, fields) {
  const user = await ctx.db.query.user({ where: { id } }, fields);
  if (user) {
    return user;
  }

  throw new UserNotFound(id);
}

// Grab fields from a user by their id. If the calling user is the target (they're performing an
// action on their own account, typically) save a wasteful query.
async function targetStudentDataHelper(ctx, targetId, fields) {
  const callingUserId = getUserId(ctx); // User must be logged in.
  const callingUserData = await getUserData(ctx, callingUserId, fields);

  // If assigning self save a step; we already have the data.
  const targetUserData = callingUserId === targetId ?
    callingUserData :
    await getUserData(ctx, targetId, fields);

  return { callingUserData, targetUserData };
}

// TODO Move errors to own file
class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

class AuthErrorAction extends Error {
  constructor(action) {
    super(`Not authorized to ${action}`);
  }
}

class UserNotFound extends Error {
  constructor(userid) {
    super(`User ${userid} not found`);
  }
}

class CourseNotFound extends Error {
  constructor(courseid) {
    super(`Course ${courseid} not found`);
  }
}

class CourseNoSubSubjectsAdded extends Error {
  constructor(courseid) {
    super(`No new SubSubjects added to Course ${courseid}`);
  }
}

class UserMustBe extends Error {
  constructor(userid, neededType) {
    super(`User ${userid} must be type ${neededType}`);
  }
}

class UserAlreadyEnrolled extends Error {
  constructor(userid) {
    super(`User ${userid} already enrolled`);
  }
}

module.exports = {
  getUserId,
  getUserData,
  targetStudentDataHelper,
  AuthError,
  AuthErrorAction,
  UserNotFound,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
  UserMustBe,
  UserAlreadyEnrolled,
};
