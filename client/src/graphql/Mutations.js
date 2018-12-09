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
  QuestionDataEverythingExtra,
} from "./fragments/QuestionFragments";

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

export const SUBMIT_QA_QUESTION = gql`
  mutation SubmitQaQuestion($subsubjectid: ID!, $type: Int!, $flags: Int!, $difficulty: Int!, $media: String, $questioninput: QuestionQuestionInput!, $answerinput: QuestionAnswerInput!) {
    submitQuestion(subsubjectid: $subsubjectid, type: $type, flags: $flags, difficulty: $difficulty, media: $media, questioninput: $questioninput, answerinput: $answerinput) {
      ...QuestionDataEverythingExtra
    }
  }
  ${QuestionDataEverythingExtra}
`;

export const UPDATE_QA_QUESTION = gql`
  mutation UpdateQaQuestion($questionid: ID!, $subsubjectid: ID, $type: Int, $flags: Int, $status: Int, $difficulty: Int, $media: String, $questioninput: QuestionQuestionInput, $answerinput: QuestionAnswerInput) {
    updateQuestion(questionid: $questionid, subsubjectid: $subsubjectid, type: $type, flags: $flags, status: $status, difficulty: $difficulty, media: $media, questioninput: $questioninput, answerinput: $answerinput) {
      ...QuestionDataEverythingExtra
    }
  }
  ${QuestionDataEverythingExtra}
`;

export const ADD_CHALLENGE_RESULTS = gql`
  mutation AddChallengeResults($studentid: ID!, $masteryscoreinput: [MasteryScoreInput]!, $surveyscoreinput: [SurveyScoreInput]!, $surveyanswerinput: [SurveyAnswerInput]!) {
    addChallengeResults(studentid: $studentid, masteryscoreinput: $masteryscoreinput, surveyscoreinput: $surveyscoreinput, surveyanswerinput: $surveyanswerinput) {
      id
    }
  }
`;

export const SUBMIT_FEEDBACK = gql`
  mutation SubmitFeedback($questionid: ID!, $type: Int!, $text: String!) {
    submitFeedback(questionid: $questionid, type: $type, text: $text) {
      id
    }
  }
`;

export const UPDATE_FEEDBACK_STATUS = gql`
  mutation UpdateFeedbackStatus($feedbackid: ID!, $status: Int!) {
    updateFeedbackStatus(feedbackid: $feedbackid, status: $status) {
      id
    }
  }
`;
