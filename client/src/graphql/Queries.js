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

export const SUBJECT_DETAILS_QUERY = gql`
  query SubjectDetailsPublicQuery {
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

export const SUBJECT_AND_MASTERY_DETAILS_QUERY = gql`
  query StudentActiveMasteriesQuery ($studentid: ID!) {
    allSubjects {
      ...SubjectDataAll
      subSubjects {
        ...SubSubjectDataAll
      }
    }
    activeMasteries(studentid: $studentid) {
      ...MasteryDataAll
      parent {
        id
      }
      subSubject {
        id
      }
    }
  }
  ${SubjectDataAll}
  ${SubSubjectDataAll}
  ${MasteryDataAll}
`;
