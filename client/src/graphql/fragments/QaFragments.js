import gql from "graphql-tag";

import {
  QaQuestionObjectDataAll,
  QaAnswerObjectDataAll,
} from "./SimpleFragments";

export const QaObjectDataAll = gql`
  fragment QaObjectDataAll on QaObject {
    questionId
    subSubjectId
    difficulty
    flags
    media
    question {
      ...QaQuestionObjectDataAll
    }
    answer {
      ...QaAnswerObjectDataAll
    }
  }
  ${QaQuestionObjectDataAll}
  ${QaAnswerObjectDataAll}
`;
