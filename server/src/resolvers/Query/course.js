const {
  getUserData,
  checkAuth,
} = require("../../utils");

const {
  AuthError,
  GraphQlDumpWarning,
  UserNotFound,
  StudentNotOwner,
  CourseNotFound,
} = require("../../errors");

const {
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  USER_STATUS_NORMAL,
  COURSE_STATUS_ACTIVE,
} = require("../../constants");

const course = {
  /**
   * Gives access to the active Course of a student. Will return null if there is no active Course.
   * For students checking themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns Course
   */
  async activeCourse(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "activeCourse",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "activeCourse");
    }

    const studentData = await getUserData(
      ctx,
      args.studentid,
      `{
        type
        enrollment {
          courses( where: {
            status: ${COURSE_STATUS_ACTIVE},
          }, first: 1) {
            id
          }
        }
      }`,
    );

    if (!studentData) {
      throw new UserNotFound(args.studentid);
    }

    // Instead of throwing errors just return null
    if (!studentData.enrollment) {
      return null; // Student is not Enrolled
    }
    if (studentData.enrollment.courses.length === 0) {
      return null;  // No Course is active
    }

    return ctx.db.query.course({ where: { id: studentData.enrollment.courses[0].id } }, info);
  },


  /**
   * Get a Course by its ID. For students checking themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        courseid: ID!
   * @param ctx
   * @param info
   * @returns Course
   */
  async course(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "course",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "course");
    }

    if (!args.courseid) {
      throw new GraphQlDumpWarning("query", "course");
    }

    // Check to make sure that the Course belongs to the student.
    const courseData = await ctx.db.query.course(
      { where: { id: args.courseid } },
      `{
        parent {
          student {
            id
          }
        }
      }`,
    );

    if (!courseData) {
      throw new CourseNotFound(args.courseid);
    }
    if (args.studentid !== courseData.parent.student.id) {
      throw new StudentNotOwner(args.studentid, args.courseid, "Course");
    }

    return ctx.db.query.course({ where: { id: args.courseid } }, info);
  },


  /**
   * Get a list of Courses by their IDs. For students checking themselves and mods or better only.
   * @param parent
   * @param args
   *        studentid: ID!
   *        courseids: [ID!]!
   * @param ctx
   * @param info
   * @returns [Course]!
   */
  async courses(parent, args, ctx, info) {
    // Exclude teachers. Students are only allowed to check themselves. Must be normal status.
    const callingUserData = await checkAuth(ctx, {
      type: [USER_TYPE_STUDENT, USER_TYPE_MODERATOR, USER_TYPE_ADMIN],
      status: USER_STATUS_NORMAL,
      action: "courses",
    });

    // A student can get their active course and moderators or better can as well.
    if (callingUserData.id !== args.studentid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthError(null, "courses");
    }

    if (!Array.isArray(args.courseids) || args.courseids.length < 1) {
      throw new GraphQlDumpWarning("query", "courses");
    }

    const queryClause = {
      where: {
        OR: args.courseids.map(courseId => ({ id: courseId })),
      },
    };

    // Check to make sure that the Courses belong to the student.
    const coursesData = await ctx.db.query.courses(
      queryClause,
      `{
        id
        parent {
          student {
            id
          }
        }
      }`,
    );

    // Notify if some Courses were owned by others.
    const wrongOwnerCourses = coursesData.filter(courseObject =>
      courseObject.parent.student.id !== args.studentid).map(wrongSurveyObject =>
      wrongSurveyObject.id);
    if (wrongOwnerCourses.length > 0) {
      throw new StudentNotOwner(args.studentid, wrongOwnerCourses.join(", "), "Survey");
    }

    // Notify if some Courses didn't exist.
    const foundCourses = coursesData.map(courseObject => courseObject.id);
    const missingCourses = args.courseids.filter(courseId =>
      !foundCourses.includes(courseId));
    if (missingCourses.length > 0) {
      throw new CourseNotFound(missingCourses.join(", "));
    }

    return ctx.db.query.courses(queryClause, info);
  },


  /**
   * Get a list of Courses by Prisma query search parameters.
   * For Moderators or better only because of potentially sensitive data.
   * Students can get them through me().
   * @param parent
   * @param args
   *        where: CourseWhereInput
   *        orderBy: CourseOrderByInput
   *        skip: Int
   *        after: String
   *        before: String
   *        first: Int
   *        last: Int
   * @param ctx
   * @param info
   * @returns [Course]!
   */
  async courseSearch(parent, args, ctx, info) {
    // Must be moderator or better and normal.
    await checkAuth(ctx, {
      type: USER_TYPE_MODERATOR,
      status: USER_STATUS_NORMAL,
      action: "courseSearch",
    });

    return ctx.db.query.courses(args, info);
  },
};

module.exports = { course };
