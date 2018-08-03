import gql from "graphql-tag";

import {
  QaObjectDataAllExtra,
} from "./SimpleFragments";

// Returns absolutely everything.
export const QaObjectDataAllExtra = gql`
  fragment QaObjectDataAllExtra on QaObject {
    ...QaObjectDataAllExtra
  }
  ${QaObjectDataAllExtra}
`;
