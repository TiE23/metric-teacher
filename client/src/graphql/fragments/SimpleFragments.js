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
