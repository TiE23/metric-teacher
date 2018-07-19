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
  MasteryDataAll,
} from "./fragments/SimpleFragments";

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
        ...EnrollmentForUserDetails
      }
    }
  }
  ${EnrollmentForUserDetails}
`;

export const SUBJECT_DETAILS_PUBLIC_QUERY = gql`
  query SubjectDetailsPublicQuery {
    subjectSearch {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
      }
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
`;

export const SUBJECT_DETAILS_STUDENT_QUERY = gql`
  query SubjectDetailsStudentQuery ($studentid: ID!) {
    subjectSearch(
      where: {
        subSubjects_every: {
          masteries_every: {
            parent: {
              AND: [
                {
                  status: 0
                },
                {
                  parent: {
                    student: {
                      id: $studentid
                    }
                  }
                }
              ]
            }
          }
        }
      }
    ) {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
        masteries {
          ...MasteryDataAll
          parent {
            id
          }
        }
      }
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
  ${MasteryDataAll}
`;
