import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mutation, compose } from "react-apollo";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import AlreadyLoggedIn from "./AlreadyLoggedIn";
import LoginSignupForm from "./LoginSignupForm";

import withAuth from "../AuthHOC";
import utils from "../../utils";

import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
} from "../../graphql/Mutations";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_LARGE,
} from "../../constants";

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
    };
  }

  redirectPath() {
    const { state } = this.props.location;
    return (state && state.from && state.from.pathname) || "/";
  }

  render() {
    if (this.props.userTokenData) {
      return (<AlreadyLoggedIn />);
    }

    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this.redirectPath()} />
      );
    }

    const loginPage = this.props.location.pathname === this.props.loginPath;
    return (
      <Mutation
        mutation={loginPage ? LOGIN_MUTATION : SIGNUP_MUTATION}
        onCompleted={(data) => {
          const { token } = loginPage ? data.login : data.signup;
          if (token) {
            utils.writeTokenLocalStorage(token);
            this.setState({ shouldRedirect: true });
          }
        }}
      >
        {(login, { loading, error }) => (
          <Grid centered>
            <Grid.Row>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_LARGE}>
                <br />
                <LoginSignupForm
                  loginPage={loginPage}
                  onSubmit={variables => login({ variables })}
                  loading={loading}
                  error={error}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </Mutation>
    );
  }
}

Login.propTypes = {
  loginPath: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.shape({
      from: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Login.defaultProps = {
  userTokenData: null,
};

export default compose(
  withRouter,
  withAuth,
)(Login);
