import gql from "graphql-tag";

export const PING_QUERY = gql`
  query PingQuery {
    ping
  }
`;
