import gql from "graphql-tag";

// TODO - Use PrivateUser fragment when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

import {
  EnrollmentDataAll,
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

export const ME_DETAILS_QUERY = gql`
  query MeDetailsQuery {
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
      enrollment {
        ...EnrollmentDataAll
      }
    }
  }
  ${EnrollmentDataAll}
`;
