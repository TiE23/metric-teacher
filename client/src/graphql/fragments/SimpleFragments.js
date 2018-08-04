import gql from "graphql-tag";

// These fragments are limited to a single-layer. Higher-order fragments should be in separate
// and intelligently labeled Fragments file.

// Doesn't include email row.
export const UserDataAll = gql`
  fragment UserDataAll on User {
    id
    createdAt
    updatedAt
    honorific
    fname
    lname
    type
    status
    flags
  }
`;

export const EnrollmentDataAll = gql`
  fragment EnrollmentDataAll on Enrollment {
    id
    createdAt
    updatedAt
  }
`;

export const CourseDataAll = gql`
  fragment CourseDataAll on Course {
    id
    createdAt
    updatedAt
    status
    flags
  }
`;

export const ClassroomDataAll = gql`
  fragment ClassroomDataAll on Classroom {
    id
    createdAt
    updatedAt
    name
    description
    status
    flags
    notes
  }
`;

export const MasteryDataAll = gql`
  fragment MasteryDataAll on Mastery {
    id
    createdAt
    updatedAt
    status
    score
  }
`;

// I very often need the parent Course's ID and the SubSubject's ID.
export const MasteryDataAllExtra = gql`
  fragment MasteryDataAllExtra on Mastery {
    ...MasteryDataAll
    parent {
      id
    }
    subSubject {
      id
    }
  }
  ${MasteryDataAll}
`;

export const SurveyDataAll = gql`
  fragment SurveyDataAll on Survey {
    id
    createdAt
    updatedAt
    status
    score
    answer
    detail
  }
`;

export const FeedbackDataAll = gql`
  fragment FeedbackDataAll on Feedback {
    id
    createdAt
    updatedAt
    type
    status
    text
  }
`;

export const QuestionDataAll = gql`
  fragment QuestionDataAll on Question {
    id
    createdAt
    updatedAt
    type
    status
    flags
    difficulty
    question
    answer
    media
  }
`;

export const SubjectDataAll = gql`
  fragment SubjectDataAll on Subject {
    id
    createdAt
    updatedAt
    name
    description
    measurementDescription
  }
`;

export const SubSubjectDataAll = gql`
  fragment SubSubjectDataAll on SubSubject {
    id
    createdAt
    updatedAt
    name
    description
    toMetric
    rarity
    scale
  }
`;

// QA Fragments
// Because fragments need to be defined before they are referenced this list is in an upside-down
// order with child nodes going before their parents.

// Leaf
export const QaUnitWordObjectDataAll = gql`
  fragment QaUnitWordObjectDataAll on QaUnitWordObject {
    plural
    singular
  }
`;

export const QaUnitObjectDataAll = gql`
  fragment QaUnitObjectDataAll on QaUnitObject {
    value
    unit
  }
`;

export const QaMixedUnitObjectDataAll = gql`
  fragment QaMixedUnitObjectDataAll on QaMixedUnitObject {
    value
    written
    unit
  }
`;

export const QaRangeObjectDataAllExtra = gql`
  fragment QaRangeObjectDataAllExtra on QaRangeObject {
    bottom {
      ...QaUnitObjectDataAll
    }
    top {
      ...QaUnitObjectDataAll
    }
  }
  ${QaUnitObjectDataAll}
`;

// Question Great Great Grand Children
export const QaSurveyResponseObjectDataAll = gql`
  fragment QaSurveyResponseObjectDataAll on QaSurveyResponseObject {
    id
    status
    score
    detail
  }
`;
export const QaSurveyResponseObjectDataAllExtra = gql`
  fragment QaSurveyResponseObjectDataAllExtra on QaSurveyResponseObject {
    ...QaSurveyResponseObjectDataAll
    answer {
      ...QaUnitObjectDataAll
    }
  }
  ${QaSurveyResponseObjectDataAll}
  ${QaUnitObjectDataAll}
`;

// Question Great Grand Children
export const QaConversionQuestionObjectDataAll = gql`
  fragment QaConversionQuestionObjectDataAll on QaConversionQuestionObject {
    step
  }
`;
export const QaConversionQuestionObjectDataAllExtra = gql`
  fragment QaConversionQuestionObjectDataAllExtra on QaConversionQuestionObject {
    ...QaConversionQuestionObjectDataAll
    range {
      ...QaRangeObjectDataAllExtra
    }
    exact {
      ...QaUnitObjectDataAll
    }
  }
  ${QaConversionQuestionObjectDataAll}
  ${QaRangeObjectDataAllExtra}
  ${QaUnitObjectDataAll}
`;

export const QaSurveyQuestionObjectDataAll = gql`
  fragment QaSurveyQuestionObjectDataAll on QaSurveyQuestionObject {
    step
  }
`;
export const QaSurveyQuestionObjectDataAllExtra = gql`
  fragment QaSurveyQuestionObjectDataAllExtra on QaSurveyQuestionObject {
    ...QaSurveyQuestionObjectDataAll
    range {
      ...QaRangeObjectDataAllExtra
    }
    response {
      ...QaSurveyResponseObjectDataAllExtra
    }
  }
  ${QaSurveyQuestionObjectDataAll}
  ${QaRangeObjectDataAllExtra}
  ${QaSurveyResponseObjectDataAllExtra}
`;

// Answer Great Grand Children
export const QaMultipleChoiceObjectDataAll = gql`
  fragment QaMultipleChoiceObjectDataAll on QaMultipleChoiceObject {
    choicesOffered
  }
`;
export const QaMultipleChoiceObjectDataAllExtra = gql`
  fragment QaMultipleChoiceObjectDataAllExtra on QaMultipleChoiceObject {
    ...QaMultipleChoiceObjectDataAll
    choices {
      ...QaMixedUnitObjectDataAll
    }
  }
  ${QaMultipleChoiceObjectDataAll}
  ${QaMixedUnitObjectDataAll}
`;

export const QaConversionObjectDataAll = gql`
  fragment QaConversionObjectDataAll on QaConversionObject {
    accuracy
    exact
    rounded
    friendly
  }
`;
export const QaConversionObjectDataAllExtra = gql`
  fragment QaConversionObjectDataAllExtra on QaConversionObject {
    ...QaConversionObjectDataAll
    choices {
      ...QaUnitObjectDataAll
    }
    range {
      ...QaRangeObjectDataAllExtra
    }
  }
  ${QaConversionObjectDataAll}
  ${QaRangeObjectDataAllExtra}
  ${QaUnitObjectDataAll}
`;

export const QaSurveyAnswerObjectDataAllExtra = gql`
  fragment QaSurveyAnswerObjectDataAllExtra on QaSurveyAnswerObject {
    choices {
      ...QaUnitObjectDataAll
    }
  }
  ${QaUnitObjectDataAll}
`;

// Grand Children
export const QaQuestionDataDataAllExtra = gql`
  fragment QaQuestionDataDataAllExtra on QaQuestionData {
    fromUnitWord {
      ...QaUnitWordObjectDataAll
    }
    conversion {
      ...QaConversionQuestionObjectDataAllExtra
    }
    survey {
      ...QaSurveyQuestionObjectDataAllExtra
    }
  }
  ${QaUnitWordObjectDataAll}
  ${QaConversionQuestionObjectDataAllExtra}
  ${QaSurveyQuestionObjectDataAllExtra}
`;

export const QaAnswerDataDataAllExtra = gql`
  fragment QaAnswerDataDataAllExtra on QaAnswerData {
    toUnitWord {
      ...QaUnitWordObjectDataAll
    }
    multiple {
      ...QaMultipleChoiceObjectDataAllExtra
    }
    conversion {
      ...QaConversionObjectDataAllExtra
    }
    survey {
      ...QaSurveyAnswerObjectDataAllExtra
    }
  }
  ${QaUnitWordObjectDataAll}
  ${QaMultipleChoiceObjectDataAllExtra}
  ${QaConversionObjectDataAllExtra}
  ${QaSurveyAnswerObjectDataAllExtra}
`;

// Children
export const QaQuestionObjectDataAll = gql`
  fragment QaQuestionObjectDataAll on QaQuestionObject{
    detail
    text
    type
  }
`;
export const QaQuestionObjectDataAllExtra = gql`
  fragment QaQuestionObjectDataAllExtra on QaQuestionObject{
    ...QaQuestionObjectDataAll
    data {
      ...QaQuestionDataDataAllExtra
    }
  }
  ${QaQuestionObjectDataAll}
  ${QaQuestionDataDataAllExtra}
`;

export const QaAnswerObjectDataAll = gql`
  fragment QaAnswerObjectDataAll on QaAnswerObject {
    detail
    type
  }
`;
export const QaAnswerObjectDataAllExtra = gql`
  fragment QaAnswerObjectDataAllExtra on QaAnswerObject {
    ...QaAnswerObjectDataAll
    data {
      ...QaAnswerDataDataAllExtra
    }
  }
  ${QaAnswerObjectDataAll}
  ${QaAnswerDataDataAllExtra}
`;

export const QaObjectDataAll = gql`
  fragment QaObjectDataAll on QaObject {
    id
    questionId
    subSubjectId
    difficulty
    flags
    media
  }
`;
export const QaObjectDataAllExtra = gql`
  fragment QaObjectDataAllExtra on QaObject {
    ...QaObjectDataAll
    question {
      ...QaQuestionObjectDataAllExtra
    }
    answer {
      ...QaAnswerObjectDataAllExtra
    }
  }
  ${QaObjectDataAll}
  ${QaQuestionObjectDataAllExtra}
  ${QaAnswerObjectDataAllExtra}
`;
