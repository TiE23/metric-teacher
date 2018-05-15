const {
  getUserId,
  getUserData,
} = require("../../utils");
const {
  AuthErrorAction,
  ClassroomNotFound,
  ClassroomNoUsersAdded,
  ClassroomNoUsersRemoved,
} = require("../../errors");
const {
  FLAGS_NONE,
  USER_TYPE_STUDENT,
  USER_TYPE_TEACHER,
  USER_TYPE_MODERATOR,
  CLASSROOM_STATUS_ACTIVE,
} = require("../../constants");

const classroom = {
  async createClassroom(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");

    // A teacher can create new Classrooms and moderators or better can as well.
    if (callingUserData.id !== args.teacherid &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("createClassroom");
    }

    // Define the data
    const data = {
      name: args.name,
      description: args.description || "",
      status: CLASSROOM_STATUS_ACTIVE,
      flags: FLAGS_NONE,
      notes: "",
      users: {
        connect: {
          id: callingUserData.id,
        },
      },
    };

    return ctx.db.mutation.createClassroom({ data }, info);
  },

  async addUsersToClassroom(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetClassroomData = await ctx.db.query.classroom({ where: { id: args.classroomid } }, `
      {
        id
        users {
          id
          type
        }
      }
    `);

    // Check the Classroom exists.
    if (targetClassroomData === null) {
      throw new ClassroomNotFound(args.classroomid);
    }
    // Grab the teachers and students.
    const classroomTeachers = targetClassroomData.users.filter(user =>
      user.type === USER_TYPE_TEACHER).map(user => user.id);
    const classroomStudents = targetClassroomData.users.filter(user =>
      user.type === USER_TYPE_STUDENT).map(user => user.id);

    // A teacher of the classroom can add to a Classroom and moderators or better can as well.
    if (!classroomTeachers.includes(callingUserData.id) &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("addUsersToClassroom");
    }

    // Don't attempt to add any teachers/students a second time.
    const newUserIds = args.userids.filter(newUserId =>
      !classroomTeachers.includes(newUserId) && !classroomStudents.includes(newUserId));

    // If no Users are being added throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (newUserIds.length === 0) {
      throw new ClassroomNoUsersAdded(targetClassroomData.id);
    }

    // Construct connect statements for each targeted User
    const newClassroomUsers = newUserIds.map(newUserId => (
      {
        id: newUserId,
      }
    ));

    // Perform the update
    const updateClassroom = await ctx.db.mutation.updateClassroom({
      where: { id: targetClassroomData.id },
      data: {
        users: {
          connect: newClassroomUsers,
        },
      },
    }, info);

    return updateClassroom;
  },

  async removeUsersFromClassroom(parent, args, ctx, info) {
    const callingUserId = await getUserId(ctx);
    const callingUserData = await getUserData(ctx, callingUserId, "{ id, type }");
    const targetClassroomData = await ctx.db.query.classroom({ where: { id: args.classroomid } }, `
      {
        id
        users {
          id
          type
        }
      }
    `);

    // Check the Classroom exists.
    if (targetClassroomData === null) {
      throw new ClassroomNotFound(args.classroomid);
    }
    // Grab the teachers and students.
    const classroomTeachers = targetClassroomData.users.filter(user =>
      user.type === USER_TYPE_TEACHER).map(user => user.id);
    const classroomStudents = targetClassroomData.users.filter(user =>
      user.type === USER_TYPE_STUDENT).map(user => user.id);

    // A teacher of the classroom can remove from a classroom and moderators or better can as well.
    if (!classroomTeachers.includes(callingUserData.id) &&
      callingUserData.type < USER_TYPE_MODERATOR) {
      throw new AuthErrorAction("removeUsersFromClassroom");
    }

    // Don't attempt to remove any teachers/students not in the Classroom.
    const removeUserIds = args.userids.filter(removeUserId =>
      classroomTeachers.includes(removeUserId) || classroomStudents.includes(removeUserId));

    // If no Users are being removed throw an error. Common situation might be where this
    // mutation is run twice by accident.
    if (removeUserIds.length === 0) {
      throw new ClassroomNoUsersRemoved(targetClassroomData.id);
    }

    // Construct connect statements for each targeted User
    const removedClassroomUsers = removeUserIds.map(removeUserId => (
      {
        id: removeUserId,
      }
    ));

    // Perform the update
    const updateClassroom = await ctx.db.mutation.updateClassroom({
      where: { id: targetClassroomData.id },
      data: {
        users: {
          disconnect: removedClassroomUsers,
        },
      },
    }, info);

    return updateClassroom;
  },
};


module.exports = { classroom };
