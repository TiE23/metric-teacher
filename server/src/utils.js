const jwt = require("jsonwebtoken");
const {
  AuthError,
  UserNotFound,
} = require("./errors");

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

module.exports = {
  getUserId,
  getUserData,
  targetStudentDataHelper,
};
