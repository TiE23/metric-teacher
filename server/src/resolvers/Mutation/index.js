const { auth } = require("./auth");
const { classroom } = require("./classroom");
const { course } = require("./course");
const { enrollment } = require("./enrollment");
const { feedback } = require("./feedback");
const { mastery } = require("./mastery");
const { question } = require("./question");
const { survey } = require("./survey");
const { user } = require("./user");

module.exports = {
  Mutation: {
    ...auth,
    ...classroom,
    ...course,
    ...enrollment,
    ...feedback,
    ...mastery,
    ...question,
    ...survey,
    ...user,
  },
};
