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
  constructor(userId) {
    super(`User ${userId} not found`);
  }
}

class UserMustBe extends Error {
  constructor(userId, neededType) {
    super(`User ${userId} must be type ${neededType}`);
  }
}

class CourseNotFound extends Error {
  constructor(courseId) {
    super(`Course ${courseId} not found`);
  }
}

class CourseInactive extends Error {
  constructor(courseId) {
    super(`Course ${courseId} is inactive`);
  }
}

class CourseNoSubSubjectsAdded extends Error {
  constructor(courseId) {
    super(`No SubSubjects added to Course ${courseId}`);
  }
}

class ClassroomNotFound extends Error {
  constructor(classroomId) {
    super(`Classroom ${classroomId} not found`);
  }
}

class ClassroomNoUsersAdded extends Error {
  constructor(classroomId) {
    super(`No Users added to Classroom ${classroomId}`);
  }
}

class ClassroomNoUsersRemoved extends Error {
  constructor(classroomId) {
    super(`No Users removed from Classroom ${classroomId}`);
  }
}

class MasteryNotFound extends Error {
  constructor(masteryId) {
    super(`Mastery ${masteryId} not found`);
  }
}

class MasteryNotFoundForSubSubject extends Error {
  constructor(courseId, subSubjectId) {
    super(`Course ${courseId} did not have a Mastery for SubSubject '${subSubjectId}'. It IS POSSIBLE the SubSubject does not exist`);
  }
}

class QuestionNotFound extends Error {
  constructor(questionId) {
    super(`Question ${questionId} not found`);
  }
}

class QuestionNotActive extends Error {
  constructor(questionId) {
    super(`Question ${questionId} not active`);
  }
}

class StudentAlreadyEnrolled extends Error {
  constructor(userId) {
    super(`User ${userId} already enrolled`);
  }
}

class StudentNotEnrolled extends Error {
  constructor(userId, action) {
    super(`User ${userId} not enrolled. Cannot perform '${action}'`);
  }
}

class StudentNotOwner extends Error {
  constructor(studentId, objectId, objectName) {
    super(`Student ${studentId} not owner of ${objectName} ${objectId}`);
  }
}

class SurveyNotFound extends Error {
  constructor(surveyId) {
    super(`Survey ${surveyId} not found`);
  }
}

class SurveyAnswerValueInvalid extends Error {
  constructor(value) {
    super(`The inputted value '${value}' is not a number`);
  }
}

class SurveyAnswerUnitInvalid extends Error {
  constructor(unit) {
    super(`The inputted unit '${unit}' is not valid`);
  }
}

class SurveyIncomplete extends Error {
  constructor(courseid, questionid) {
    super(`Survey for Question ${questionid} and Course ${courseid} incomplete`);
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

class ChallengeCouldNotFindSubSubjects extends Error {
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
  CourseInactive,
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
  SurveyIncomplete,
  SurveyAnswerValueInvalid,
  SurveyAnswerUnitInvalid,
  QuestionSyntaxError,
  QuestionAnswerError,
  QuestionTypeInvalid,
  AnswerSyntaxError,
  AnswerUnitMissing,
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
  ChallengeHasNoTargetedSubSubjects,
  ChallengeCouldNotFindSubSubjects,
};
