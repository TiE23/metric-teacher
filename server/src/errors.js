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

class InputLengthAboveMaximum extends Error {
  constructor(inputName, maximum) {
    super(`Input ${inputName} exceeds maximum character limit (${maximum})`);
  }
}

class InputLengthBelowMinimum extends Error {
  constructor(inputName, minimum) {
    super(`Input ${inputName} doesn't meet minimum character requirement (${minimum})`);
  }
}

class ExistingPasswordRequired extends Error {
  constructor(action) {
    super(`Existing password must be supplied to ${action}`);
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

class CourseNoMasteriesAdded extends Error {
  constructor(courseId) {
    super(`No Masteries added to Course ${courseId}`);
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

class StudentNoActiveCourse extends Error {
  constructor(userId, action) {
    super(`User ${userId} has no active Course. Cannot perform '${action}'`);
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

class SurveyAnswerIncomplete extends Error {
  constructor(courseId, questionId) {
    super(`Survey answer for Question ${questionId} and Course ${courseId} incomplete`);
  }
}

class QuestionSyntaxError extends Error {
  constructor(question, reason) {
    super(`Question '${question}' not valid. Reason: '${reason}'`);
  }
}

class QuestionGenericError extends Error {
  constructor(reason) {
    super(`Question not valid. Reason: '${reason}`);
  }
}

class QuestionTextSyntaxError extends Error {
  constructor(questionText, reason) {
    super(`Question text '${questionText}' not valid. Reason: '${reason}`);
  }
}

class QuestionConversionSyntaxError extends Error {
  constructor(reason) {
    super(`Question conversion input not valid. Reason: '${reason}`);
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

class AnswerGenericError extends Error {
  constructor(reason) {
    super(`Answer not valid. Reason: '${reason}`);
  }
}

class AnswerTextSyntaxError extends Error {
  constructor(answerText, reason) {
    super(`Answer text '${answerText}' not valid. Reason: '${reason}`);
  }
}

class AnswerMultipleChoiceSyntaxError extends Error {
  constructor(reason) {
    super(`Answer multiple-choice input not valid. Reason: '${reason}`);
  }
}

class AnswerConversionSyntaxError extends Error {
  constructor(reason) {
    super(`Answer conversion input not valid. Reason: '${reason}`);
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
  InputLengthAboveMaximum,
  InputLengthBelowMinimum,
  ExistingPasswordRequired,
  CourseNotFound,
  CourseInactive,
  CourseNoMasteriesAdded,
  ClassroomNotFound,
  ClassroomNoUsersAdded,
  ClassroomNoUsersRemoved,
  MasteryNotFound,
  MasteryNotFoundForSubSubject,
  QuestionNotFound,
  QuestionNotActive,
  StudentAlreadyEnrolled,
  StudentNotEnrolled,
  StudentNoActiveCourse,
  StudentNotOwner,
  SurveyNotFound,
  SurveyAnswerValueInvalid,
  SurveyAnswerUnitInvalid,
  SurveyAnswerIncomplete,
  QuestionSyntaxError,
  QuestionGenericError,
  QuestionTextSyntaxError,
  QuestionConversionSyntaxError,
  QuestionAnswerError,
  QuestionTypeInvalid,
  AnswerSyntaxError,
  AnswerGenericError,
  AnswerTextSyntaxError,
  AnswerMultipleChoiceSyntaxError,
  AnswerConversionSyntaxError,
  AnswerUnitMissing,
  UnitTypeUnrecognized,
  ConversionIncompatible,
  ConversionNegativeValue,
  ChallengeHasNoTargetedSubSubjects,
  ChallengeCouldNotFindSubSubjects,
};
