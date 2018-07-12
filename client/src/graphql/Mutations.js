import gql from "graphql-tag";

// TODO - Use Fragments when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $fname: String!, $lname: String!) {
    signup(email: $email, password: $password, fname: $fname, lname: $lname) {
      token
      user {
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
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
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
  }
`;
