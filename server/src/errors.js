class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

class AuthErrorAction extends Error {
  constructor(action) {
    super(`Not authorized to ${action}`);
  }
}

class UserNotFound extends Error {
  constructor(userid) {
    super(`User ${userid} not found`);
  }
}

class CourseNotFound extends Error {
  constructor(courseid) {
    super(`Course ${courseid} not found`);
  }
}

class CourseNoSubSubjectsAdded extends Error {
  constructor(courseid) {
    super(`No SubSubjects added to Course ${courseid}`);
  }
}

class ClassroomNotFound extends Error {
  constructor(classroomid) {
    super(`Classroom ${classroomid} not found`);
  }
}

class ClassroomNoUsersAdded extends Error {
  constructor(classroomid) {
    super(`No Users added to Classroom ${classroomid}`);
  }
}

class ClassroomNoUsersRemoved extends Error {
  constructor(classroomid) {
    super(`No Users removed from Classroom ${classroomid}`);
  }
}

class UserMustBe extends Error {
  constructor(userid, neededType) {
    super(`User ${userid} must be type ${neededType}`);
  }
}

class UserAlreadyEnrolled extends Error {
  constructor(userid) {
    super(`User ${userid} already enrolled`);
  }
}

module.exports = {
  AuthError,
  AuthErrorAction,
  UserNotFound,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
  ClassroomNotFound,
  ClassroomNoUsersAdded,
  ClassroomNoUsersRemoved,
  UserMustBe,
  UserAlreadyEnrolled,
};
