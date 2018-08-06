import gql from "graphql-tag";

// TODO - Use Fragments when issue is fixed someday.
// https://github.com/prismagraphql/prisma-binding/issues/208
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
  SurveyForUserDetails,
} from "./fragments/SurveyFragments";

import {
  CourseDataAll,
  MasteryDataAllExtra,
  SurveyDataAll,
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

export const COURSE_UPDATE_FLAGS_MUTATION = gql`
  mutation CourseUpdateFlagsMutation($courseid: ID!, $flags: Int!) {
    updateCourseFlags(courseid: $courseid, flags: $flags) {
      ...CourseDataAll
    }
  }
  ${CourseDataAll}
`;

export const STUDENT_ASSIGN_NEW_MASTERY_MUTATION = gql`
  mutation StudentAssignNewMasteriesMutation($studentid: ID!, $subsubjectid: ID!) {
    assignStudentNewMastery(studentid: $studentid, subsubjectid: $subsubjectid) {
      ...MasteryDataAllExtra
    }
  }
  ${MasteryDataAllExtra}
`;

export const MASTERY_UPDATE_STATUS_MUTATION = gql`
  mutation MasteryUpdateStatusMutation($masteryid: ID!, $status: Int!) {
    updateMasteryStatus(masteryid: $masteryid, status: $status) {
      ...MasteryDataAllExtra
    }
  }
  ${MasteryDataAllExtra}
`;

export const SURVEY_UPDATE_STATUS_MUTATION = gql`
  mutation SurveyUpdateStatusMutation($surveyid: ID!, $status: Int!) {
    updateSurveyStatus(surveyid: $surveyid, status: $status) {
      ...SurveyDataAll
    }
  }
  ${SurveyDataAll}
`;

export const SURVEY_ADD_ANSWER_MUTATION = gql`
  mutation SurveyAddAnswerMutation($studentid: ID!, $answerinput: SurveyAnswerInput!) {
    addSurveyAnswer(studentid: $studentid, answerinput: $answerinput) {
      ...SurveyForUserDetails
    }
  }
  ${SurveyForUserDetails}
`;
