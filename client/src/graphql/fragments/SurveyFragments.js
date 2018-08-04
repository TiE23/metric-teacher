import gql from "graphql-tag";

import {
  QuestionDataAll,
  SurveyDataAll,
} from "./SimpleFragments";

export const SurveyForUserDetails = gql`
  fragment SurveyForUserDetails on Survey {
    ...SurveyDataAll
    question {
      ...QuestionDataAll
    }
    parent {
      id
    }
  }
  ${SurveyDataAll}
  ${QuestionDataAll}
`;
