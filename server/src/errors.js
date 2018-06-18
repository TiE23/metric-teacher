class AuthError extends Error {
  constructor(reason = null, action = null) {
    if (reason && !action) {
      super(`Not authorized. Reason: ${reason}`);
    } else if (!reason && action) {
      super(`Not authorized: '${action}'`);
    } else if (reason && action) {
      super(`Not authorized: '${action}'. Reason: ${reason}`);
    } else {
      super("Not authorized");
    }
  }
}

class GraphQlDumpWarning extends Error {
  constructor(requestType, action) {
    super(`Tried to run a ${requestType} with incomplete where statement while performing '${action}'`);
  }
}

class UserNotFound extends Error {
  constructor(userid) {
    super(`User ${userid} not found`);
  }
}

class UserMustBe extends Error {
  constructor(userid, neededType) {
    super(`User ${userid} must be type ${neededType}`);
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

class MasteryNotFoundForSubSubject extends Error {
  constructor(courseId, subSubjectId) {
    super(`Course ${courseId} did not have a Mastery for SubSubject '${subSubjectId}'. It IS POSSIBLE the SubSubject does not exist`);
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

class StudentAlreadyEnrolled extends Error {
  constructor(userid) {
    super(`User ${userid} already enrolled`);
  }
}

class StudentNotEnrolled extends Error {
  constructor(userid, action) {
    super(`User ${userid} not enrolled. Cannot perform '${action}'`);
  }
}

class StudentNotOwner extends Error {
  constructor(studentid, objectid, objectname) {
    super(`Student ${studentid} not owner of ${objectname} ${objectid}`);
  }
}

class SurveyNotFound extends Error {
  constructor(surveyid) {
    super(`Survey ${surveyid} not found`);
  }
}

class QuestionSyntaxError extends Error {
  constructor(question, reason) {
    super(`Question '${question}' not valid. Reason: '${reason}'`);
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

class AnswerSyntaxError extends Error {
  constructor(answer, reason) {
    super(`Answer '${answer}' not valid. Reason: '${reason}'`);
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

class ChallengeHasNoTargetedSubSubjects extends Error {
  constructor() {
    super("Cannot generate a challenge when no Subjects or SubSubjects are requested");
  }
}

class ChallangeCouldNotFindSubSubjects extends Error {
  constructor(targetedSubjectIds) {
    super(`Cannot generate a challenge with no SubSubjects. Could not find any in Subjects '${targetedSubjectIds}'`);
  }
}


module.exports = {
  AuthError,
  GraphQlDumpWarning,
  UserNotFound,
  UserMustBe,
  CourseNotFound,
  CourseNoSubSubjectsAdded,
  ClassroomNotFound,
  ClassroomNoUsersAdded,
  ClassroomNoUsersRemoved,
  MasteryNotFound,
  MasteryNotFoundForSubSubject,
  QuestionNotFound,
  QuestionNotActive,
  StudentAlreadyEnrolled,
  StudentNotEnrolled,
  StudentNotOwner,
  SurveyNotFound,
  QuestionSyntaxError,
  QuestionAnswerError,
  QuestionTypeInvalid,
  AnswerSyntaxError,
  AnswerUnitMissing,
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
  ChallengeHasNoTargetedSubSubjects,
  ChallangeCouldNotFindSubSubjects,
};
