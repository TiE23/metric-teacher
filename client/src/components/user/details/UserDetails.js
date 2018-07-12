import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import UserDetailBasics from "./UserDetailBasics";
import QueryHandler from "../../QueryHandler";

// TODO - Would it make sense to add this to the Apollo cache at all?
import { USER_DETAILS_QUERY } from "../../../graphql/Queries";

const UserDetails = props => (
  <Query
    query={USER_DETAILS_QUERY}
    variables={{ userid: props.userid }}
  >
    {queryProps => (
      <QueryHandler
        query={queryProps}
      >
        <UserDetailBasics
          query={queryProps}
        />
        {/* TODO - Further components showing different user data. */}
      </QueryHandler>
    )}
  </Query>
);

UserDetails.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default withRouter(UserDetails);
