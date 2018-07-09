import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import QueryWaiter from "./QueryWaiter";
import ErrorPleaseLogin from "./ErrorPleaseLogin";

import { ME_AUTH_QUERY } from "../graphql/Queries";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingComponent, options = {}) => {
  // TODO - Make this a pure function.
  class AuthHOC extends Component {
    render() {
      // TODO - Make the Query only run on Private routes.
      return (
        <Query
          query={ME_AUTH_QUERY}
          fetchPolicy="cache-first"
        >
          {queryProps => (
            <QueryWaiter
              optional={!options.private}
              query={queryProps}
              loadingErrorProps={{
                errorMessage: <ErrorPleaseLogin error={queryProps.error} />,
                loadingMessage: options.private && "Checking if you're logged in...",
              }}
            >
              <IncomingComponent
                query={queryProps}
                {...options.props}
              />
            </QueryWaiter>
          )}
        </Query>
      );
    }
  }

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  AuthHOC.propTypes = {
    options: PropTypes.shape({
      private: PropTypes.bool,
    }),
  };

  AuthHOC.defaultProps = {
    options: {
      private: false,
    },
  };

  return withRouter(AuthHOC);
};
