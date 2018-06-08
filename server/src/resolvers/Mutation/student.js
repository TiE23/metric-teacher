const {
  targetStudentDataHelper,
} = require("../../utils");
const {
  AuthErrorAction,
  UserMustBe,
  UserAlreadyEnrolled,
} = require("../../errors");
const {
  FLAGS_NONE,
  USER_TYPE_STUDENT,
  USER_TYPE_TEACHER,
  USER_TYPE_MODERATOR,
  CLASSROOM_STATUS_ACTIVE,
  COURSE_STATUS_ACTIVE,
  COURSE_STATUS_INACTIVE,
} = require("../../constants");


const student = {
  async enrollStudent(parent, args, ctx, info) {
    const { callingUserData, targetUserData } =
      await targetStudentDataHelper(ctx, args.studentid, "{ id, type, enrollment { id } }");

    // Only a student can be enrolled.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }
    // They cannot already be enrolled.
    if (targetUserData.enrollment !== null) {
      throw new UserAlreadyEnrolled(targetUserData.id);
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


  async assignStudentNewCourse(parent, args, ctx, info) {
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
              classrooms (where: {
                status: ${CLASSROOM_STATUS_ACTIVE}
              }) {
                id
                teachers {
                  id
                }
              }
            }
          }
        }
      `);

    // Only a student can be assigned a course.
    if (targetUserData.type !== USER_TYPE_STUDENT) {
      throw new UserMustBe(targetUserData.id, "STUDENT");
    }

    // Grab existing active courses (there should only be one, but we can't be too careful!)
    const activeCourses = targetUserData.enrollment.courses.map(course => course.id);

    // We grab the target student's classrooms' teachers (ACTIVE COURSES AND ACTIVE CLASSROOMS ONLY)
    // if the calling user isn't the student (hopefully their teacher)
    const teachers = [];
    if (callingUserData.type === USER_TYPE_TEACHER &&
      callingUserData.id !== targetUserData.id &&
      targetUserData.enrollment && targetUserData.enrollment.courses[0]
    ) {
      targetUserData.enrollment.courses[0].classrooms.forEach((classroom) => {
        teachers.push(...classroom.teachers.map(teacher => teacher.id));
      });
    }
    // A student can assign themselves a Course and their teacher, moderators, or better can as well
    if (callingUserData.id !== targetUserData.id &&
      !teachers.includes(callingUserData.id) &&
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
      const mutationClause = {
        where: {
          OR: [],
        },
        data: {
          status: COURSE_STATUS_INACTIVE,
        },
      };
      mutationClause.where.OR = activeCourses.map(courseId => ({ id: courseId }));
      ctx.db.mutation.updateManyCourses(mutationClause, "{ count }"); // Do not await, just fire and forget
    }

    return course;
  },

  // TODO Write a "set active course" mutation that will deactivate all other courses
};


module.exports = { student };
