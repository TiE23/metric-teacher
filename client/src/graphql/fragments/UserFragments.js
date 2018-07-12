import gql from "graphql-tag";

import { UserDataAll } from "./SimpleFragments";

// TODO - Fix failing Fragments for PrivateUser
// Until the issue I found and reported in https://github.com/TiE23/p-b-fragments-bug is fixed, I
// will not be able to use this fragment.
export const MeAuthData = gql`
  fragment MeAuthData on PrivateUser {
    ...UserDataAll
    email
  }
  ${UserDataAll}
`;
