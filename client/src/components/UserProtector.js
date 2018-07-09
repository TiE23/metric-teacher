import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import { withRouter } from "react-router";

import LoadingError from "./LoadingError";
import ErrorPleaseLogin from "./ErrorPleaseLogin";

import { ME_AUTH_QUERY } from "../graphql/Queries";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingComponent, options = {}) => {
  // TODO - Make this a pure function.
  class AuthHOC extends Component {
    render() {
      const { meAuthData } = this.props;

      // TODO - Rewrite this whole thing. It's hideous and confusing.
      // Only show the error (usually the user is not logged in) if the route is private.
      if (meAuthData.loading ||
        (options.private && (meAuthData.error || meAuthData.me === undefined))
      ) {
        return (
          <LoadingError
            error={meAuthData.error || (options.private && !meAuthData.loading &&
              meAuthData.me === undefined)}
            errorMessage={meAuthData.error ? <ErrorPleaseLogin error={meAuthData.error} /> : null}
            loadingMessage={options.private ? "Checking if you're logged in..." : "Loading..."}
          />
        );
      }

      // Pass the received "props" and created functions to the IncomingComponent component
      return (
        <IncomingComponent
          {...this.props}
          {...options.props}
          meAuthQuery={ME_AUTH_QUERY}
        />
      );
    }
  }

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  AuthHOC.propTypes = {
    meAuthData: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.any,
      me: PropTypes.any,
    }).isRequired,
  };

  return compose(
    withRouter,
    withApollo,
    graphql(ME_AUTH_QUERY, {
      name: "meAuthData",
      options: { fetchPolicy: "cache-first" },
    }),
  )(AuthHOC);
};
