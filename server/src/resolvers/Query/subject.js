const {
  checkAuth,
} = require("../../utils");

const {
  USER_TYPE_STUDENT,
} = require("../../constants");

const subject = {
  async allSubjects(parent, args, ctx, info) {
    await checkAuth(ctx, {
      type: USER_TYPE_STUDENT,
      action: "query allSubjects",
    });  // Must be logged in
    const subjects = await ctx.db.query.subjects({}, info);

    return subjects;
  },
};

module.exports = { subject };
