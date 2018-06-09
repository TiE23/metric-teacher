const {
  targetStudentDataHelper,
  setStatusForCourses,
  checkAuth,
} = require("../../utils");
const {
  AuthErrorAction,
  CourseNotFound,
  UserMustBe,
  StudentAlreadyEnrolled,
  StudentNotEnrolled,
} = require("../../errors");
const {
  FLAGS_NONE,
  USER_STATUS_NORMAL,
  USER_TYPE_STUDENT,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
  COURSE_STATUS_ACTIVE,
  COURSE_STATUS_INACTIVE,
} = require("../../constants");


const student = {
  /**
   * Gives a student a new course and makes that course the only active course for that student.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns Enrollment!
   */
  async enrollStudent(parent, args, ctx, info) {
    // Block teachers and non-normal users.
    await checkAuth(
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

    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

    // Only a student can be enrolled.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }
    // They cannot already be enrolled.
    if (targetUserData.enrollment !== null) {
      throw new StudentAlreadyEnrolled(targetUserData.id);
    }
    // A student can enroll themselves and moderators or better can can as well.
    if (callingUserData.id !== targetUserData.id && callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("enrollStudent");
    }

    // Create new Enrollment, connecting to targeted user.
    return ctx.db.mutation.createEnrollment({
      data: {
        student: {
          connect: {
            id: targetUserData.id,
          },
        },
      },
    }, info);
  },


  /**
   * Give a student a new course. They must be enrolled first, though.
   * @param parent
   * @param args
   *        studentid: ID!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async assignStudentNewCourse(parent, args, ctx, info) {
    // Block teachers and non-normal users.
    await checkAuth(
      ctx,
      {
        type: [
          USER_TYPE_STUDENT,
          USER_TYPE_MODERATOR,
          USER_TYPE_ADMIN,
        ],
        status: USER_STATUS_NORMAL,
        action: "assignStudentNewCourse",
      },
    );

    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, `
        {
          id
          type
          enrollment {
            id
            courses (where: {
              status: ${COURSE_STATUS_ACTIVE}
            }) {
              id
            }
          }
        }
      `);

    // Only a student can be assigned a course.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }

    // Cannot assign a course to a student that isn't enrolled.
    if (!targetUserData.enrollment) {
      throw new StudentNotEnrolled(targetUserData.id, "assignStudentNewCourse");
    }

    // Grab existing active courses (there should be at most one, but we can't be too careful!)
    const activeCourses = targetUserData.enrollment.courses.map(course => course.id);

    // A student can assign themselves a Course and moderators or better can as well
    if (callingUserData.id !== targetUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("assignStudentNewCourse");
    }

    // Create new Course, connecting to targeted Enrollment.
    const course = await ctx.db.mutation.createCourse({
      data: {
        status: FLAGS_NONE,
        flags: COURSE_STATUS_ACTIVE,
        parent: {
          connect: {
            id: targetUserData.enrollment.id,
          },
        },
      },
    }, info);

    // Deactivate all other previously active courses, leave only the new one active
    if (activeCourses.length) {
      // Do not await, just fire and forget
      setStatusForCourses(ctx, activeCourses, COURSE_STATUS_INACTIVE);
    }

    return course;
  },


  /**
   * Will set a student's courses all to inactive and the targeted course to active. Requires
   * the studentid to perform.
   * @param parent
   * @param args
   *        studentid: ID!
   *        courseid: ID!
   * @param ctx
   * @param info
   * @returns Course!
   */
  async setActiveCourse(parent, args, ctx, info) {
    // Block teachers and non-normal users.
    await checkAuth(
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

    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, `
        {
          id
          type
          enrollment {
            id
            courses {
              id
              status
            }
          }
        }
      `);

    // Only a student can be assigned a course.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }

    // Cannot assign a course to a student that isn't enrolled.
    if (!targetUserData.enrollment) {
      throw new StudentNotEnrolled(targetUserData.id, "setActiveCourse");
    }

    // Grab existing courses
    const courseIds = targetUserData.enrollment.courses.map(course => course.id);

    // A student can change their Courses and moderators or better can as well
    if (callingUserData.id !== targetUserData.id &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("setActiveCourse");
    }

    // Course we're trying to activate isn't found
    if (!courseIds.includes(args.courseid)) {
      throw new CourseNotFound(args.courseid);
    }

    // Remove the targeted courseid
    const targetCoursePosition = courseIds.indexOf(args.courseid);
    courseIds.splice(targetCoursePosition, 1);

    if (courseIds.length) {
      // Do not await, just fire and forget
      setStatusForCourses(ctx, courseIds, COURSE_STATUS_INACTIVE);
    }

    // Let's check that the course is actually deactivated first. If it is, make it active.
    if (targetUserData.enrollment.courses[targetCoursePosition].status !== COURSE_STATUS_ACTIVE) {
      // Do not await, just fire and forget
      setStatusForCourses(ctx, [args.courseid], COURSE_STATUS_ACTIVE);
    }

    return ctx.db.query.course({ where: { id: args.courseid } }, info);
  },
};


module.exports = { student };
