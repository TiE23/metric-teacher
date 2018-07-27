const {
  checkAuth,
} = require("../../utils");

const {
  minMax,
} = require("../../logic/utils");

const {
  AuthError,
  MasteryNotFound,
  CourseNoMasteriesAdded,
  StudentNoActiveCourse,
} = require("../../errors");

const queryCourse = require("../Query/course");

const {
  MASTERY_STATUS_ACTIVE,
  MASTERY_DEFAULT_SCORE,
  MASTERY_MIN_SCORE,
  MASTERY_MAX_SCORE,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
} = require("../../constants");

const mastery = {
  /**
   * Create a single new Mastery for a student by their user ID. Only the owning student (or
   * moderators or better) can do this.
   * @param parent
   * @param args
   *        studentid: ID!
   *        subsubjectid: ID!
   * @param ctx
   * @param info
   * @returns Mastery!
   */
  async assignStudentNewMastery(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "assignStudentNewMastery",
    });

    const targetCourseData =
      await queryCourse.course.activeCourse(parent, { studentid: args.studentid }, ctx, `
      {
        id
        parent {
          student {
            id
          }
        }
        masteries {
          subSubject {
            id 
          }
        }
      }
    `);

    if (!targetCourseData) {
      throw new StudentNoActiveCourse(args.studentid, "assignStudentNewMasteries");
    }

    // A student can assign new SubSubjects and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "assignStudentNewMasteries");
    }

    const existingSubSubjectIds =
      targetCourseData.masteries.map(masteryObject => masteryObject.subSubject.id);

    if (existingSubSubjectIds.includes(args.subsubjectid)) {
      throw new CourseNoMasteriesAdded(targetCourseData.id);
    }

    return ctx.db.mutation.createMastery({
      data: {
        status: MASTERY_STATUS_ACTIVE,
        score: MASTERY_DEFAULT_SCORE,
        parent: {
          connect: {
            id: targetCourseData.id,
          },
        },
        subSubject: {
          connect: {
            id: args.subsubjectid,
          },
        },
      },
    }, info);
  },


  /**
   * Update a Mastery's status. Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        masteryid: ID!
   *        status: Int
   * @param ctx
   * @param info
   * @returns Mastery!
   */
  async updateMasteryStatus(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "updateMasteryStatus",
    });

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
    if (callingUserData.id !== targetMasteryData.parent.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "updateMasteryStatus");
    }

    // Perform the update.
    return ctx.db.mutation.updateMastery({
      where: { id: args.masteryid },
      data: {
        status: args.status,
      },
    }, info);
  },


  /**
   * Give a Mastery ID and a score you want to increase/decrease the Mastery score by.
   * Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        masteryid: ID!
   *        score: Int!
   * @param ctx
   * @param info
   * @returns Mastery!
   */
  async addMasteryScore(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addMasteryScore",
    });

    // Get the target Mastery row.
    const targetMasteryData = await ctx.db.query.mastery(
      { where: { id: args.masteryid } },
      `{
        score
        parent {
          parent {
            student {
              id
            }
          }
        }
      }`,
    );

    if (!targetMasteryData) {
      throw new MasteryNotFound(args.masteryid);
    }

    // A student can change their Mastery and moderators or better can as well.
    if (callingUserData.id !== targetMasteryData.parent.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addMasteryScore");
    }

    // Calculate the new score.
    const newScore = minMax(
      MASTERY_MIN_SCORE,
      targetMasteryData.score + args.score,
      MASTERY_MAX_SCORE,
    );

    // Fire the mutation!
    return ctx.db.mutation.updateMastery({
      where: { id: args.masteryid },
      data: { score: newScore },
    }, info);
  },
};

module.exports = { mastery };
