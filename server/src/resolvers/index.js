const { Query } = require("./Query");
const { auth } = require("./Mutation/auth");
const { user } = require("./Mutation/user");
const { student } = require("./Mutation/student");
const { course } = require("./Mutation/course");
const { classroom } = require("./Mutation/classroom");
const { AuthPayload } = require("./AuthPayload");

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...user,
    ...student,
    ...course,
    ...classroom,
  },
  AuthPayload,
};
