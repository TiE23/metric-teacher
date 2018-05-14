const {
  getUserId,
  getUserData,
  AuthErrorAction,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
} = require("../../utils");
const {
  USER_TYPE_MODERATOR,
  MASTERY_DEFAULT_SCORE,
  MASTERY_STATUS_ENABLED,
} = require("../../constants");

const course = {
  async assignCourseNewSubSubjects(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
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
    // TODO let teachers (who are in the SAME CLASSROOM) also assign SubSubjects.
    if (callingUserData.id !== targetCourseData.parent.student.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("assignCourseNewSubSubjects");
    }

    // Only act on SubSubjects that are not already listed in masteries
    const existingSubSubjectIds =
      targetCourseData.masteries.map(mastery => mastery.subSubject.id);
    const newSubSubjectIds =
      args.subsubjects.filter(newSubSubjectId => !existingSubSubjectIds.includes(newSubSubjectId));

    // If no SubSubjects are being added throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (newSubSubjectIds.length === 0) {
      throw new CourseNoSubSubjectsAdded(targetCourseData.id);
    }

    // Construct create statements for each targeted SubSubject
    const newMasteries = newSubSubjectIds.map(subSubjectId => (
      {
        status: MASTERY_STATUS_ENABLED,
        score: MASTERY_DEFAULT_SCORE,
        subSubject: {
          connect: {
            id: subSubjectId,
          },
        },
      }
    ));

    const updateCourse = ctx.db.mutation.updateCourse({
      where: { id: args.courseid },
      data: {
        masteries: {
          create: newMasteries,
        },
      },
    });

    return {
      success: true,
    };
  },

};


module.exports = { course };
