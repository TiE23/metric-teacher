const { user } = require("./user");
const { qa } = require("./qa");
const { subject } = require("./subject");

module.exports = {
  Query: {
    ...user,
    ...qa,
    ...subject,
  },
};
