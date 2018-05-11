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

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

class AuthErrorAction extends Error {
  constructor() {
    super("Action not authorized")
  }
}

class UserNotFound extends Error {
  constructor(userid) {
    super(`User ${userid} not found`);
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
  AuthError,
  AuthErrorAction,
  UserNotFound,
  UserMustBe,
  UserAlreadyEnrolled,
};
