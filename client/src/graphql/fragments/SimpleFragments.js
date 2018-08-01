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

export const QaRangeObjectDataAll = gql`
  fragment QaRangeObjectDataAll on QaRangeObject {
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
    score
    answer {
      ...QaUnitObjectDataAll
    }
    detail
  }
  ${QaUnitObjectDataAll}
`;

// Question Great Grand Children
export const QaConversionQuestionObjectDataAll = gql`
  fragment QaConversionQuestionObjectDataAll on QaConversionQuestionObject {
    exact {
      ...QaUnitObjectDataAll
    }
    step
  }
  ${QaUnitObjectDataAll}
`;

export const QaSurveyQuestionObjectDataAll = gql`
  fragment QaSurveyQuestionObjectDataAll on QaSurveyQuestionObject {
    step
    surveyRange {
      ...QaRangeObjectDataAll
    }
    response {
      ...QaSurveyResponseObjectDataAll
    }
    status
  }
  ${QaRangeObjectDataAll}
  ${QaSurveyResponseObjectDataAll}
`;

// Answer Great Grand Children
export const QaMultipleChoiceObjectDataAll = gql`
  fragment QaMultipleChoiceObjectDataAll on QaMultipleChoiceObject {
    choicesOffered
    choices {
      ...QaMixedUnitObjectDataAll
    }
  }
  ${QaMixedUnitObjectDataAll}
`;

export const QaConversionObjectDataAll = gql`
  fragment QaConversionObjectDataAll on QaConversionObject {
    accuracy
    range {
      ...QaRangeObjectDataAll
    }
    exact
    rounded
    friendly
    choices {
      ...QaUnitObjectDataAll
    }
  }
  ${QaRangeObjectDataAll}
  ${QaUnitObjectDataAll}
`;

export const QaSurveyAnswerObjectDataAll = gql`
  fragment QaSurveyAnswerObjectDataAll on QaSurveyAnswerObject {
    choices {
      ...QaUnitObjectDataAll
    }
  }
  ${QaUnitObjectDataAll}
`;

// Grand Children
export const QaQuestionDataDataAll = gql`
  fragment QaQuestionDataDataAll on QaQuestionData {
    fromUnitWord {
      ...QaUnitWordObjectDataAll
    }
    conversion {
      ...QaConversionQuestionObjectDataAll
    }
    survey {
      ...QaSurveyQuestionObjectDataAll
    }
  }
  ${QaUnitWordObjectDataAll}
  ${QaConversionQuestionObjectDataAll}
  ${QaSurveyQuestionObjectDataAll}
`;

export const QaAnswerDataDataAll = gql`
  fragment QaAnswerDataDataAll on QaAnswerData {
    toUnitWord {
      ...QaUnitWordObjectDataAll
    }
    multiple {
      ...QaMultipleChoiceObjectDataAll
    }
    conversion {
      ...QaConversionObjectDataAll
    }
    survey {
      ...QaSurveyAnswerObjectDataAll
    }
  }
  ${QaUnitWordObjectDataAll}
  ${QaMultipleChoiceObjectDataAll}
  ${QaConversionObjectDataAll}
  ${QaSurveyAnswerObjectDataAll}
`;

// Children
export const QaQuestionObjectDataAll = gql`
  fragment QaQuestionObjectDataAll on QaQuestionObject{
    detail
    text
    type
    data {
      ...QaQuestionDataDataAll
    }
  }
  ${QaQuestionDataDataAll}
`;

export const QaAnswerObjectDataAll = gql`
  fragment QaAnswerObjectDataAll on QaAnswerObject {
    detail
    type
    data {
      ...QaAnswerDataDataAll
    }
  }
  ${QaAnswerDataDataAll}
`;
