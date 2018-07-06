const { user } = require("./user");
const { qa } = require("./qa");
const { subject } = require("./subject");
const { subSubject } = require("./subSubject");
const { classroom } = require("./classroom");
const { course } = require("./course");
const { mastery } = require("./mastery");
const { survey } = require("./survey");
const { question } = require("./question");
const { feedback } = require("./feedback");
const { other } = require("./other");

module.exports = {
  Query: {
    ...user,
    ...qa,
    ...subject,
    ...subSubject,
    ...classroom,
    ...course,
    ...mastery,
    ...survey,
    ...question,
    ...feedback,
    ...other,
  },
};
