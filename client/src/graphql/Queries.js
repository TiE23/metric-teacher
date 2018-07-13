import gql from "graphql-tag";

// TODO - Use PrivateUser fragment when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

import {
  EnrollmentDataAll,
  CourseDataAll,
  ClassroomDataAll,
  MasteryDataAll,
  SubSubjectDataAll,
  SurveyDataAll,
  QuestionDataAll,
} from "./fragments/SimpleFragments";

export const PING_QUERY = gql`
  query PingQuery {
    ping
  }
`;

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
    user (userid: $userid) {
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
        ...EnrollmentDataAll
        courses (where: { status: 0 }, first: 1) {
          ...CourseDataAll
          classrooms {
            ...ClassroomDataAll
            teachers {
              id
              fname
              lname
              honorific
            }
          }
          masteries {
            ...MasteryDataAll
            subSubject {
              ...SubSubjectDataAll
            }
          }
          surveys {
            ...SurveyDataAll
            question {
              ...QuestionDataAll
            }
          }
        }
      }
    }
  }
  ${EnrollmentDataAll}
  ${CourseDataAll}
  ${ClassroomDataAll}
  ${MasteryDataAll}
  ${SubSubjectDataAll}
  ${SurveyDataAll}
  ${QuestionDataAll}
`;
