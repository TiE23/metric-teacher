import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import UserDetailBasics from "./UserDetailBasics";
import LoadingError from "../../LoadingError";
import QueryWaiter from "../../QueryWaiter";

// TODO - Can I not add this to the Apollo cache?
import { ME_DETAILS_QUERY } from "../../../graphql/Queries";

const UserDetails = (props) => {
  return (
    <Query
      query={ME_DETAILS_QUERY}
    >
      {queryProps => (
        <QueryWaiter
          query={queryProps}
          loadingErrorProps={{ loadingMessage: "123123123123123" }}
        >
          <UserDetailBasics
            query={queryProps}
          />
        </QueryWaiter>
      )}
    </Query>
  );
};

export default withRouter(UserDetails);
