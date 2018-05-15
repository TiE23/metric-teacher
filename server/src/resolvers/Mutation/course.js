const {
  getUserId,
  getUserData,
} = require("../../utils");
const {
  AuthErrorAction,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
} = require("../../errors");
const {
  USER_TYPE_MODERATOR,
  COURSE_STATUS_ACTIVE,
  COURSE_STATUS_INACTIVE,
  MASTERY_DEFAULT_SCORE,
  MASTERY_STATUS_ACTIVE,
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

    const updateCourse = await ctx.db.mutation.updateCourse({
      where: { id: targetCourseData.id },
      data: {
        masteries: {
          create: newMasteries,
        },
      },
    }, info);

    return updateCourse;
  },

  async activateCourse(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
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
    if (targetCourseData.parent.student.id !== callingUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("activateCourse");
    }

    // Perform the update
    return ctx.db.mutation.updateCourse({
      where: { id: targetCourseData.id },
      data: {
        status: COURSE_STATUS_ACTIVE,
      },
    }, info);
  },

  async deactivateCourse(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
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
    if (targetCourseData.parent.student.id !== callingUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("deactivateCourse");
    }

    // Perform the update
    return ctx.db.mutation.updateCourse({
      where: { id: targetCourseData.id },
      data: {
        status: COURSE_STATUS_INACTIVE,
      },
    }, info);
  },
};


module.exports = { course };
