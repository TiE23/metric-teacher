import gql from "graphql-tag";

import {
  QaObjectDataAll,
  QaObjectDataAllExtra,
} from "./SimpleFragments";

// Returns absolutely everything.
export const QaObjectDataEverything = gql`
  fragment QaObjectDataEverything on QaObject {
    ...QaObjectDataAllExtra
  }
  ${QaObjectDataAllExtra}
`;

// Get just the data needed to populate all necessary Question information.
export const QaObjectQuestionDataLimited = gql`
  fragment QaObjectQuestionDataLimited on QaObject {
    questionId
    subSubjectId
    difficulty
    flags
    media
    question {
      text
      detail
      type
      data {
        conversion {
          step
          range {
            bottom {
              value
            }
            top {
              value
              unit
            }
          }
        }
        survey {
          step
          range {
            bottom {
              value
            }
            top {
              value
              unit
            }
          }
        }
      }
    }
    answer {
      detail
      data {
        multiple {
          choices {
            unit
            written
            value
          }
          choicesOffered
        }
        conversion {
          accuracy
          range {
            bottom {
              unit
            }
          }
        }
      }
    }
  }
  ${QaObjectDataAll}
`;
