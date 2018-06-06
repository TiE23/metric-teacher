class AuthError extends Error {
  constructor(reason = null, action = null) {
    if (reason && !action) {
      super(`Not authorized. Reason: ${reason}`);
    } else if (!reason && action) {
      super(`Not authorized to ${action}`);
    } else if (reason && action) {
      super(`Not authorized to ${action}. Reason: ${reason}`);
    } else {
      super("Not authorized");
    }
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

class MasteryNotFound extends Error {
  constructor(masteryid) {
    super(`Mastery ${masteryid} not found`);
  }
}

class QuestionNotFound extends Error {
  constructor(questionid) {
    super(`Question ${questionid} not found`);
  }
}

class QuestionNotActive extends Error {
  constructor(questionid) {
    super(`Question ${questionid} not active`);
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

class QuestionSyntaxError extends Error {
  constructor(question, reason) {
    super(`Question '${question}' not valid. Reason: '${reason}'`);
  }
}

class AnswerSyntaxError extends Error {
  constructor(answer, reason) {
    super(`Answer '${answer}' not valid. Reason: '${reason}'`);
  }
}

class QuestionAnswerError extends Error {
  constructor(question, answer, reason) {
    super(`Question '${question}' and answer '${answer}' not valid together. Reason: '${reason}'`);
  }
}

class QuestionTypeInvalid extends Error {
  constructor(questionType) {
    super(`Question type '${questionType}' not valid`);
  }
}

class AnswerUnitMissing extends Error {
  constructor() {
    super("Missing answer unit");
  }
}

class UnitTypeUnrecognized extends Error {
  constructor(unit) {
    super(`Unit type '${unit}' not recognized`);
  }
}

class ConversionIncompatible extends Error {
  constructor(fromUnitSubject, fromUnitWord, toUnitSubject, toUnitWord) {
    super(`Impossible to convert ${fromUnitSubject} unit '${fromUnitWord}' to ${toUnitSubject} unit '${toUnitWord}'`);
  }
}

class ConversionNegativeValue extends Error {
  constructor(value, fromUnitWord) {
    super(`Cannot convert negative amount (${value}) of ${fromUnitWord}`);
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
  MasteryNotFound,
  QuestionNotFound,
  QuestionNotActive,
  UserMustBe,
  UserAlreadyEnrolled,
  QuestionSyntaxError,
  AnswerSyntaxError,
  QuestionAnswerError,
  QuestionTypeInvalid,
  AnswerUnitMissing,
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
};
