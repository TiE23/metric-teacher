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
   * Get a Course by its ID. Only the owning student (or moderators or better) can do this.
   * @param parent
   * @param args
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

    if (!args.courseid) {
      throw new GraphQlDumpWarning("query", "course");
    }

    // Check to make sure that the Course belongs to the student. Mods and better can access freely.
    if (callingUserData.type < USER_TYPE_MODERATOR) {
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

      // A student can get their active course and moderators or better can as well.
      if (callingUserData.id !== courseData.parent.parent.student.id &&
        callingUserData.type < USER_TYPE_MODERATOR) {
        throw new AuthError(null, "course");
      }
    }

    return ctx.db.query.course({ where: { id: args.courseid } }, info);
  },


  /**
   * Get a list of Courses by their IDs. Only the owning student (or moderators or better) can
   * do this.
   * @param parent
   * @param args
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

    if (!Array.isArray(args.courseids) || args.courseids.length < 1) {
      throw new GraphQlDumpWarning("query", "courses");
    }

    const queryClause = {
      where: {
        OR: args.courseids.map(courseId => ({ id: courseId })),
      },
    };

    // Check to make sure that the Courses belong to the student. Mods and better can access freely
    // whatever Courses they want.
    if (callingUserData.type < USER_TYPE_MODERATOR) {
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
        courseObject.parent.student.id !== callingUserData.id).map(wrongSurveyObject =>
        wrongSurveyObject.id);
      if (wrongOwnerCourses.length > 0) {
        throw new StudentNotOwner(callingUserData.id, wrongOwnerCourses.join(", "), "Course");
      }
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
