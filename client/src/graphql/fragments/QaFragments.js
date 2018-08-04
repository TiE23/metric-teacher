import gql from "graphql-tag";

import {
  QaObjectDataAllExtra,
} from "./SimpleFragments";

// Returns absolutely everything.
export const QaObjectDataEverything = gql`
  fragment QaObjectDataEverything on QaObject {
    ...QaObjectDataAllExtra
  }
  ${QaObjectDataAllExtra}
`;
