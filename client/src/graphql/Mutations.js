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

import {
  MasteryDataAll,
} from "./fragments/SimpleFragments";

export const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $fname: String!, $lname: String!) {
    signup(email: $email, password: $password, fname: $fname, lname: $lname) {
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// Only grabbing fields that are accessible and can be changed in the mutation.
export const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation UpdateUserProfileMutation($userid: ID!, $email: String, $password: PasswordInput, $honorific: String, $fname: String, $lname: String) {
    updateUserProfile(userid: $userid, email: $email, password: $password, honorific: $honorific, fname: $fname, lname: $lname) {
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

export const STUDENT_ASSIGN_NEW_MASTERY_MUTATION = gql`
  mutation StudentAssignNewMasteriesMutation($studentid: ID!, $subsubjectid: ID!) {
    assignStudentNewMastery(studentid: $studentid, subsubjectid: $subsubjectid) {
      ...MasteryDataAll
      parent {
        id
      }
    }
  }
  ${MasteryDataAll}
`;

export const MASTERY_UPDATE_STATUS_MUTATION = gql`
  mutation MasteryUpdateStatusMutation($masteryid: ID!, $status: Int!) {
    updateMasteryStatus(masteryid: $masteryid, status: $status) {
      ...MasteryDataAll
      parent {
        id
      }
    }
  }
  ${MasteryDataAll}
`;
