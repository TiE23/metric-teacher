import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import LoadingError from "./LoadingError";
import ErrorPleaseLogin from "./ErrorPleaseLogin";
import utils from "../utils";

/**
 * Authorization Higher-Order-Component. Wrap your desired component and it'll provide both a
 * method to protect private routes but also provide JWT token data - to give the client the
 * logged-in user's data on whatever private-route page they happen to be viewing. Inspired by:
 * https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
 *
 * Ex) Declare a route private like so:
 *    import withAuth from "./components/AuthHOC";
 *    <Switch>
 *      <Route exact path="/private" component={withAuth(PrivateComponent, { private: true })} />
 *    </Switch>
 *
 * There are two settings: private and permissions.
 * Private blocks out any people who aren't logged in.
 * Permissions blocks out certain people who are logged in.
 *
 * @param IncomingComponent
 * @param options
 * @returns {*}
 */
export default (IncomingComponent, options = {}) => {
  const AuthHOC = () => {
    const userTokenData = utils.checkJWT();

    // Check that the user is even logged in (has a valid token).
    if (options.private) {
      if (!userTokenData) {
        return (
          <LoadingError
            error
            errorHeader="You must be logged in to visit this page."
            errorMessage={
              <ErrorPleaseLogin showLoginLinks />
            }
          />
        );
      }
    }

    // Check user permissions.
    if (options.permissions) {
      const { approval, rejectionReasons } =
        utils.checkAuth(userTokenData, options.permissions);
      if (!approval) {
        return (
          <LoadingError
            error
            errorHeader="Insufficient permissions."
            errorMessage={
              <ErrorPleaseLogin error={{ message: rejectionReasons.join("\n") }} />
            }
          />
        );
      }

      // User was logged in and user had permissions. Pass the userTokenData along as well!
      return (
        <IncomingComponent
          {...options.props}
          userTokenData={userTokenData}
        />
      );
    }

    // Nothing required but pass on the userTokenData if it exists as well, it might be useful.
    return (
      <IncomingComponent
        {...options.props}
        userTokenData={userTokenData}
      />
    );
  };

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  // TODO - These don't actually do anything, do they?
  AuthHOC.propTypes = {
    options: PropTypes.shape({
      props: PropTypes.any,
      private: PropTypes.bool,
      permissions: PropTypes.shape({
        type: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.array,
        ]),
        status: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.array,
        ]),
        flagExclude: PropTypes.number,
        flagRequire: PropTypes.number,
        action: PropTypes.string,
      }),
    }),
  };

  AuthHOC.defaultProps = {
    options: {
      props: null,
      private: false,
      permissions: {
        type: null,
        status: null,
        flagExclude: null,
        flagRequire: null,
        action: null,
      },
    },
  };

  return withRouter(AuthHOC);
};
