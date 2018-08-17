import gql from "graphql-tag";

import {
  SubjectDataAll,
  SubSubjectDataAll,
  QuestionDataAll,
} from "./SimpleFragments";

export const QuestionDataEverything = gql`
  fragment QuestionDataEverything on Question {
    ...QuestionDataAll
  }
  ${QuestionDataAll}
`;

export const QuestionDataEverythingExtra = gql`
  fragment QuestionDataEverythingExtra on Question {
    ...QuestionDataAll
    parent {
      ...SubSubjectDataAll
      parent {
        ...SubjectDataAll
      }
    }
  }
  ${QuestionDataAll}
  ${SubSubjectDataAll}
  ${SubjectDataAll}
`;
