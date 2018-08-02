import gql from "graphql-tag";

import {
  QaObjectDataAll,
  QaQuestionObjectDataAll,
  QaAnswerObjectDataAll,
} from "./SimpleFragments";

export const QaObjectDataAll = gql`
  fragment QaObjectDataAll on QaObject {
    ...QaObjectDataAll
    question {
      ...QaQuestionObjectDataAll
    }
    answer {
      ...QaAnswerObjectDataAll
    }
  }
  ${QaObjectDataAll}
  ${QaQuestionObjectDataAll}
  ${QaAnswerObjectDataAll}
`;
