const { Query } = require("./Query");
const { auth } = require("./Mutation/auth");
const { user } = require("./Mutation/user");
const { AuthPayload } = require("./AuthPayload");

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...user,
  },
  AuthPayload,
};
