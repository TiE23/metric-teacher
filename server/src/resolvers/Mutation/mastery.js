const {
  getUserId,
  getUserData,
} = require("../../utils");
const {
  AuthErrorAction,
  MasteryNotFound,
} = require("../../errors");
const {
  MASTERY_STATUS_ACTIVE,
  MASTERY_STATUS_INACTIVE,
  USER_TYPE_MODERATOR,
} = require("../../constants");

const mastery = {
  async activateMastery(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetMasteryData = await ctx.db.query.mastery({ where: { id: args.masteryid } }, `
      {
        id
        status
        parent {
          parent {
            student {
              id
            }
          }
        }
      }
    `);

    // Check the Mastery exists.
    if (targetMasteryData === null) {
      throw new MasteryNotFound(args.masteryid);
    }

    // A student can change the status of a Mastery and moderators or better can as well.
    if (targetMasteryData.parent.parent.student.id !== callingUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("activateMastery");
    }

    // Perform the update
    return ctx.db.mutation.updateMastery({
      where: { id: targetMasteryData.id },
      data: {
        status: MASTERY_STATUS_ACTIVE,
      },
    }, info);
  },

  async deactivateMastery(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetMasteryData = await ctx.db.query.mastery({ where: { id: args.masteryid } }, `
      {
        id
        status
        parent {
          parent {
            student {
              id
            }
          }
        }
      }
    `);

    // Check the Mastery exists.
    if (targetMasteryData === null) {
      throw new MasteryNotFound(args.masteryid);
    }

    // A student can change the status of a Mastery and moderators or better can as well.
    if (targetMasteryData.parent.parent.student.id !== callingUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("deactivateMastery");
    }

    // Perform the update
    return ctx.db.mutation.updateMastery({
      where: { id: targetMasteryData.id },
      data: {
        status: MASTERY_STATUS_INACTIVE,
      },
    }, info);
  },
};

module.exports = { mastery };
