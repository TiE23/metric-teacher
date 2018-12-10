import gql from "graphql-tag";

import {
  FeedbackDataAll,
} from "./SimpleFragments";

import {
  QuestionDataEverythingAuthorReviewer,
} from "./QuestionFragments";

export const FeedbackDataEverything = gql`
  fragment FeedbackDataEverything on Feedback {
    ...FeedbackDataAll
  }
  ${FeedbackDataAll}
`;

export const FeedbackDataEverythingExtra = gql`
  fragment FeedbackDataEverythingExtra on Feedback {
    ...FeedbackDataAll
    question {
      ...QuestionDataEverythingAuthorReviewer
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
  ${FeedbackDataAll}
  ${QuestionDataEverythingAuthorReviewer}
`;
