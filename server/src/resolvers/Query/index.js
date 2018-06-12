const { user } = require("./user");
const { qa } = require("./qa");
const { subject } = require("./subject");
const { classroom } = require("./classroom");

module.exports = {
  Query: {
    ...user,
    ...qa,
    ...subject,
    ...classroom,
  },
};
