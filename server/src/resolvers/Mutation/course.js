const {
  checkAuth,
} = require("../../utils");

const {
  AuthErrorAction,
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
  MASTERY_STATUS_ACTIVE,
} = require("../../constants");


const course = {
  /**
   * Assigns subSubjects to an existing course.
   * TODO let teachers (connected via active course + active classroom) also assign SubSubjects.
   * @param parent
   * @param args
   *        courseid: ID!
   *        subsubjects: [ID!]!
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
  async assignCourseNewSubSubjects(parent, args, ctx, info) {
    const callingUserData = await checkAuth(
      ctx,
      {
        type: [
          USER_TYPE_STUDENT,
          USER_TYPE_MODERATOR,
          USER_TYPE_ADMIN,
        ],
        status: USER_STATUS_NORMAL,
        action: "assignCourseNewSubSubjects",
      },
    );

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
      throw new AuthErrorAction("assignCourseNewSubSubjects");
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
   * Deactivates a course. Doesn't need a studentid to do it, but does check to make sure that a
   * student cannot somehow affect a course that doesn't belong to them.
   * @param parent
   * @param args
   *        studentid: ID!
   *        courseid: ID!
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
  async deactivateCourse(parent, args, ctx, info) {
    const callingUserData = await checkAuth(
      ctx,
      {
        type: [
          USER_TYPE_STUDENT,
          USER_TYPE_MODERATOR,
          USER_TYPE_ADMIN,
        ],
        status: USER_STATUS_NORMAL,
        action: "deactivateCourse",
      },
    );

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

    // Course must belong to the targeted student.
    if (args.studentid !== targetCourseData.parent.student.id) {
      throw new CourseNotFound(`${args.courseid} for student ${args.studentid}`);
    }

    // A student can change the status of a Course and moderators or better can as well.
    if (args.studentid !== callingUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("deactivateCourse");
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
