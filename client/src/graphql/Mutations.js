import gql from "graphql-tag";

// TODO - Use Fragments when issue is fixed someday.
// import {
//   MeAuthData,
// } from "./fragments/UserFragments";

import {
  EnrollmentForUserDetails,
} from "./fragments/EnrollmentFragments";

import {
  CourseForUserDetails,
} from "./fragments/CourseFragments";

// TODO - Only need the token?
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

// TODO - Only need the token?
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

// Only grabbing fields that are accessible and can be changed in the mutation.
export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfileMutation($userid: ID!, $email: String, $passwordnew: String, $passwordold: String, $honorific: String, $fname: String, $lname: String) {
    updateUserProfile(userid: $userid, email: $email, password: {new: $passwordnew, old: $passwordold}, honorific: $honorific, fname: $fname, lname: $lname) {
      email
      honorific
      fname
      lname
    }
  }
`;

export const ENROLL_STUDENT_MUTATION = gql`
  mutation EnrollStudentMutation($studentid: ID!) {
    enrollStudent(studentid: $studentid) {
      ...EnrollmentForUserDetails
    }
  }
  ${EnrollmentForUserDetails}
`;

export const COURSE_ASSIGN_MUTATION = gql`
  mutation CourseAssignMutation($studentid: ID!, $prefermetric: Boolean) {
    assignStudentNewCourse(studentid: $studentid, prefermetric: $prefermetric) {
      ...CourseForUserDetails
    }
  }
  ${CourseForUserDetails}
`;
