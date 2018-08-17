import gql from "graphql-tag";

import {
  QuestionDataAll,
} from "./SimpleFragments";

export const QuestionDataEverything = gql`
  fragment QuestionDataEverything on Question {
    ...QuestionDataAll
  }
  ${QuestionDataAll}
`;
