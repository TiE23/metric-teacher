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

export const QuestionDataEverythingAuthorReviewer = gql`
  fragment QuestionDataEverythingAuthorReviewer on Question {
    ...QuestionDataAll
    author {
      id
      type
    }
    reviewer {
      id
      type
    }
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
    author {
      id
      type
    }
    reviewer {
      id
      type
    }
  }
  ${QuestionDataAll}
  ${SubSubjectDataAll}
  ${SubjectDataAll}
`;
