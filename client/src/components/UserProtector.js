import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import LoadingError from "./LoadingError";

import { ME_AUTH_QUERY } from "../graphql/Queries";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingRoute, options = {}) => {
  class AuthHOC extends Component {
    render() {
      const { meAuthData } = this.props;

      // Only show the error (usually the user is not logged in) if the route is private.
      if (meAuthData.loading ||
        (options.private && (meAuthData.error || meAuthData.me === undefined))
      ) {
        return (
          <LoadingError
            error={meAuthData.error || (options.private && meAuthData.me === undefined)}
            errorMessage={(
              <div>
                <p>{(meAuthData.error && meAuthData.error.message) || "There was a problem..."}</p>
                {meAuthData.error && meAuthData.error.message === "GraphQL error: Not authorized" &&
                  <p>
                    Please <Link to={{
                      pathname: "/login",
                      state: { from: this.props.location },
                    }}>Login</Link> {" "}
                    or <Link to={{
                      pathname: "/signup",
                      state: { from: this.props.location },
                    }}>Sign-up</Link>!
                  </p>
                }
              </div>
            )}
            loadingMessage={options.private ? "Checking if you're logged in..." : "Loading..."}
          />
        );
      }

      // Pass the received "props" and created functions to the IncomingRoute component
      return (
        <IncomingRoute
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
      loading: PropTypes.bool,
      error: PropTypes.any,
      me: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.number,
        status: PropTypes.number,
        flags: PropTypes.number,
        fname: PropTypes.string,
        lname: PropTypes.string,
        honorific: PropTypes.string,
        email: PropTypes.string,
      }),
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
