const {
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  GraphQlDumpWarning,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
} = require("../../errors");

const {
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  COURSE_STATUS_INACTIVE,
  MASTERY_DEFAULT_SCORE,
  MASTERY_MIN_SCORE,
  MASTERY_MAX_SCORE,
  MASTERY_STATUS_ACTIVE,
} = require("../../constants");

const course = {
  /**
   * Assigns subSubjects to an existing course. Only the owning student (or moderators or better)
   * can do this.
   * TODO let teachers (connected via active course + active classroom) also assign SubSubjects.
   * @param parent
   * @param args
   *        courseid: ID!
   *        subsubjects: [ID!]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async assignCourseNewSubSubjects(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "assignCourseNewSubSubjects",
    });

    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
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

    // Check the course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }

    // A student can assign new SubSubjects and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "assignCourseNewSubSubjects");
    }

    // Only act on SubSubjects that are not already listed in Masteries
    const existingSubSubjectIds =
      targetCourseData.masteries.map(mastery => mastery.subSubject.id);
    const newSubSubjectIds =
      args.subsubjects.filter(newSubSubjectId => !existingSubSubjectIds.includes(newSubSubjectId));

    // If no SubSubjects are being added throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (newSubSubjectIds.length === 0) {
      throw new CourseNoSubSubjectsAdded(targetCourseData.id);
    }

    // Construct connect statements for each targeted SubSubject
    const newMasteries = newSubSubjectIds.map(subSubjectId => (
      {
        status: MASTERY_STATUS_ACTIVE,
        score: MASTERY_DEFAULT_SCORE,
        subSubject: {
          connect: {
            id: subSubjectId,
          },
        },
      }
    ));

    return ctx.db.mutation.updateCourse({
      where: { id: targetCourseData.id },
      data: {
        masteries: {
          create: newMasteries,
        },
      },
    }, info);
  },


  /**
   * Give a courseid and a list of combination SubSubject IDs and scores (positive or negative) and
   * those values will be added to each valid Mastery belonging to that Course. Only the owning
   * student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   *        scoreinput: [
   *          MasteryScoreInput: {
   *            subsubjectid: ID!
   *            score: Int!
   *          }
   *        ]!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async addMasteryScores(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "addMasteryScores",
    });

    if (!args.courseid) {
      throw new GraphQlDumpWarning("mutation", "addMasteryScores");
    }

    // Create the subSubjectIds clause string.
    const subSubjectClauseStrings = [];
    args.scoreinput.forEach(scoreInputRow =>
      subSubjectClauseStrings.push(`{ subSubject: { id: "${scoreInputRow.subsubjectid}" } }`));

    // Note: Does not check if the Mastery is active or not, so it could affect inactive Masteries.
    const targetCourseData = await ctx.db.query.course(
      { where: { id: args.courseid } },
      `{
        id
        parent {
          student {
            id
          }
        }
        masteries(where:{
          OR: [
            ${subSubjectClauseStrings.join(",")}
          ]
        }){
          subSubject {
            id
          }
          id
          score
        }
      }`,
    );

    if (!targetCourseData) {
      throw new CourseNotFound(args.courseid);
    }

    // Check to make sure that the Course belongs to the student. Mods and better can access freely.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "addMasteryScores");
    }

    // Flatten the scoreinput into an object where keys are the subsubjectid and value is score.
    // If the student doesn't have a Mastery for the SubSubject it will be silently handled by
    // simply not updating any Mastery that matches.
    const scoreAdditions = {};
    args.scoreinput.forEach((scoreInputRow) => {
      scoreAdditions[scoreInputRow.subsubjectid] = scoreInputRow.score;
    });

    // Now make the Mastery update clause for the updateCourse mutation.
    const masteriesUpdateClause = [];
    targetCourseData.masteries.forEach((mastery) => {
      const newScore = Math.max(
        MASTERY_MIN_SCORE,
        Math.min(
          MASTERY_MAX_SCORE,
          mastery.score + scoreAdditions[mastery.subSubject.id],
        ),
      );
      masteriesUpdateClause.push({
        where: { id: mastery.id },
        data: { score: newScore },
      });
    });

    // Perform the mutation.
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        masteries: {
          update: masteriesUpdateClause,
        },
      },
    }, info);
  },


  /**
   * Deactivates a course. Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
   *        courseid: ID!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async deactivateCourse(parent, args, ctx, info) {
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "deactivateCourse",
    });

    const targetCourseData = await ctx.db.query.course({ where: { id: args.courseid } }, `
      {
        id
        status
        parent {
          student {
            id
          }
        }
      }
    `);

    // Check the Course exists.
    if (targetCourseData === null) {
      throw new CourseNotFound(args.courseid);
    }
    // A student can change the status of a Course and moderators or better can as well.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "deactivateCourse");
    }

    // Perform the update
    return ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        status: COURSE_STATUS_INACTIVE,
      },
    }, info);
  },
};

module.exports = { course };
