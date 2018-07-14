import React, { Component } from "react";
import PropTypes from "prop-types";

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
 *      <Route exact path="/private" component={withAuth(PrivateComponent, {
 *        private: true,
 *        props: { foo: "bar" }
 *      })} />
 *    </Switch>
 *
 * The prop object `props` will be passed as props to the wrapped Component.
 *
 * There are two settings: private and permissions.
 * Private (a bool) blocks out any people who aren't logged in.
 * Permissions (an object fitting the permissions argument of checkAuth() in utils) blocks out
 * certain people who are logged in.
 *
 * Ex) Gain access to JWT token data in the prop userTokenData like so:
 *    import withAuth from "../AuthHOC";
 *    const MyComponent = (props) => {
 *      [...]
 *    };
 *    export default withAuth(MyComponent);
 *
 * @param WrappedComponent
 * @param options
 * @returns {*}
 */
const withAuth = (WrappedComponent, options = {}) => {
  class AuthHOC extends Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.userTokenData = utils.checkJWT();
    }

    render() {
      // Check that the user is even logged in (has a valid token).
      if (options.private && !this.userTokenData) {
        return (
          <LoadingError
            error
            errorHeader="You must be logged in to visit this page."
            errorMessage={
              <ErrorPleaseLogin showLoginLinks/>
            }
          />
        );
      }

      // Check user permissions.
      if (options.permissions) {
        const { approval, rejectionReasons } =
          utils.checkAuth(this.userTokenData, options.permissions);
        if (!approval) {
          return (
            <LoadingError
              error
              errorHeader="Insufficient permissions."
              errorMessage={
                <ErrorPleaseLogin error={{ message: rejectionReasons.join(" ") }} />
              }
            />
          );
        }
      }

      return (
        <WrappedComponent
          userTokenData={this.userTokenData}
          {...this.props}
          {...options.props}
        />
      );
    }
  }

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

  return AuthHOC;
};

export default withAuth;
