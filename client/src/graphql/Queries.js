import gql from "graphql-tag";

// TODO - Use PrivateUser fragment when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

import {
  EnrollmentForUserDetails,
} from "./fragments/EnrollmentFragments";

import {
  SubjectDataAll,
  SubSubjectDataAll,
  MasteryDataAllExtra,
} from "./fragments/SimpleFragments";

import {
  QaObjectDataEverything,
  QaObjectQuestionDataLimited,
} from "./fragments/QaFragments";

import {
  QuestionDataEverythingExtra,
} from "./fragments/QuestionFragments";

export const ME_AUTH_QUERY = gql`
  query MeAuthQuery {
    me {
      id
      createdAt
      updatedAt
      email
      honorific
      fname
      lname
      type
      status
      flags
    }
  }
`;

// TODO - Save data by building tailored fragments.
export const USER_DETAILS_QUERY = gql`
  query UserDetailsQuery ($userid: ID!) {
    user(userid: $userid) {
      id
      createdAt
      updatedAt
      email
      honorific
      fname
      lname
      type
      status
      flags
      enrollment {
        ...EnrollmentForUserDetails
      }
    }
  }
  ${EnrollmentForUserDetails}
`;

export const STUDENT_ACTIVE_SUBJECTS = gql`
  query StudentActiveSubjects ($studentid: ID!) {
    activeMasteries(studentid: $studentid) {
      subSubject {
        id
        name
        description
        scale
        toMetric
        parent {
          id
          media
          name
        }
      }
    }
  }
`;

export const SUBJECT_DETAILS_QUERY = gql`
  query SubjectDetailsQuery {
    allSubjects {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
      }
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
`;

// Same as SUBJECT_DETAILS_QUERY but also includes a convenient Subject ID inside every SubSubject.
export const SUBJECT_DETAILS_PARENT_ID_QUERY = gql`
  query SubjectDetailsParentIdQuery {
    allSubjects {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
        parent {
          id
          name
        }
      }
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
`;

export const SUBSUBJECT_DETAILS_QUERY = gql`
  query SubSubjectDetailsQuery ($subsubjectid: ID!) {
    subSubject(subsubjectid: $subsubjectid) {
      ...SubSubjectDataAll
      parent {
        ...SubjectDataAll
      }
    }
  }
  ${SubSubjectDataAll}
  ${SubjectDataAll}
`;

// "first: 0" on masteries is important work-around to allow client-side manipulation in
// SubjectsList component where a student's active Masteries are added before the page is rendered.
// Limiting to zero lets me have an empty array to later fill with a single Mastery.
export const SUBJECT_AND_MASTERY_DETAILS_QUERY = gql`
  query StudentActiveMasteriesQuery ($studentid: ID!) {
    allSubjects {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
        masteries (first: 0) {
          ...MasteryDataAllExtra
        }
      }
    }
    activeMasteries (studentid: $studentid) {
      ...MasteryDataAllExtra
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
  ${MasteryDataAllExtra}
`;

export const GENERATE_CHALLENGE = gql`
  query GenerateChallenge ($studentid: ID!, $subjectids: [ID], $subsubjectids: [ID], $listsize: Int!, $ignorerarity: Boolean, $ignoredifficulty: Boolean, $ignorepreference: Boolean) {
    generateChallenge(studentid: $studentid, subjectids: $subjectids, subsubjectids: $subsubjectids, listsize: $listsize, ignorerarity: $ignorerarity, ignoredifficulty: $ignoredifficulty, ignorepreference: $ignorepreference) {
      ...QaObjectDataEverything
    }
  }
  ${QaObjectDataEverything}
`;

export const GET_QA_QUESTIONS_WITH_STUDENT = gql`
  query GetQaQuestionsWithStudent ($questionids: [ID!]!, $studentid: ID!) {
    getQa(questionids: $questionids, studentid: $studentid) {
      ...QaObjectDataEverything
    }
  }
  ${QaObjectDataEverything}
`;

export const GET_QA_QUESTIONS_WITHOUT_STUDENT = gql`
  query GetQaQuestionsWithoutStudent ($questionids: [ID!]!) {
    getQa(questionids: $questionids) {
      ...QaObjectDataEverything
    }
  }
  ${QaObjectDataEverything}
`;

export const GET_QA_QUESTIONS_DATA_LIMITED = gql`
  query GetQaQuestionsDataLimited ($questionids: [ID!]!) {
    getQa(questionids: $questionids) {
      ...QaObjectQuestionDataLimited
    }
  }
  ${QaObjectQuestionDataLimited}
`;

export const QUESTION_SEARCH = gql`
  query QuestionSearch ($where: QuestionWhereInput, $orderBy: QuestionOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    questionSearch(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
      ...QuestionDataEverythingExtra
    }
  }
  ${QuestionDataEverythingExtra}
`;

// TODO - Use PrivateUser fragment when issue is fixed someday.
export const USER_SEARCH = gql`
  query UserSearch ($where: UserWhereInput, $orderBy: UserOrderByInput, $skip: Int, $after: String, $before: String, $first: Int, $last: Int) {
    userSearch(where: $where, orderBy: $orderBy, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
      id
      createdAt
      updatedAt
      email
      honorific
      fname
      lname
      type
      status
      flags
    }
  }
`;

export const CHALLENGE_COMPLETE_SUBSUBJECTS = gql`
  query ChallengeCompleteSubSubjects ($studentId: ID!, $subSubjectIds: [ID!]!) {
    subSubjects(subsubjectids: $subSubjectIds) {
      id
      name
      masteries (
        where: {
          status: 0,
          parent: {
            status: 0,
            parent: {
              student: {
                id: $studentId
              }
            }
          }
        }
      ) {
        id
        score
      }
    }
  }
`;

export const CHALLENGE_COMPLETE_SURVEYS = gql`
  query ChallengeCompleteSurveys ($surveyIds: [ID!]!) {
    surveys(surveyids: $surveyIds) {
      id
      score
      question {
        question
      }
    }
  }
`;

export const CHALLENGE_COMPLETE_QUESTIONS = gql`
  query ChallengeCompleteQuestions ($questionIds: [ID!]!) {
    questions(questionids: $questionIds) {
      id
      question
    }
  }
`;
