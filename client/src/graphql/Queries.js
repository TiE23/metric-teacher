import gql from "graphql-tag";

// TODO - Use Fragments when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

export const PING_QUERY = gql`
  query PingQuery {
    ping
  }
`;

export const ME_AUTH_QUERY = gql`
  query MeAuthQuery {
    me {
        id
        email
        type
        status
        flags
        fname
        lname
        honorific
    }
  }
`;
