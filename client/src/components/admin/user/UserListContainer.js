import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import UserListTable from "./UserListTable";

import {
  USER_SEARCH,
} from "../../../graphql/Queries";

const UserListContainer = props => (
  <Query
    query={USER_SEARCH}
    variables={props.searchVariables}
    fetchPolicy="network-only"  // Fresh data on every search.
  >
    {queryProps => (
      <QueryHandler
        queryData={queryProps}
        noDataIsAcceptable
      >
        <UserListTable
          userData={queryProps.data.userSearch}
          queryInfo={{ query: USER_SEARCH, variables: queryProps.variables }}
        />
      </QueryHandler>
    )}
  </Query>
);

UserListContainer.propTypes = {
  searchVariables: PropTypes.shape({
    where: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
};

export default UserListContainer;
