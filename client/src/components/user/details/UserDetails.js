import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import UserDetailBasics from "./UserDetailBasics";
import UserDetailEnrollment from "./UserDetailEnrollment";

import { USER_DETAILS_QUERY } from "../../../graphql/Queries";

const UserDetails = props => (
  <Query
    query={USER_DETAILS_QUERY}
    variables={{ userid: props.userid }}
  >
    {queryProps => (
      <QueryHandler queryData={queryProps} >
        <UserDetailBasics />
        <UserDetailEnrollment userQuery={USER_DETAILS_QUERY} />
      </QueryHandler>
    )}
  </Query>
);

UserDetails.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default UserDetails;
