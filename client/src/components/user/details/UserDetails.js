import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import UserDetailBasics from "./UserDetailBasics";

// TODO - Can I not add this to the Apollo cache?
import { ME_DETAILS_QUERY } from "../../../graphql/Queries";

const UserDetails = (props) => {
  return (
    <div>
      <Query
        query={ME_DETAILS_QUERY}
      >
        {queryProps => (
          <UserDetailBasics
            query={queryProps}
          />
        )}
      </Query>
    </div>
  );
};

export default withRouter(UserDetails);
