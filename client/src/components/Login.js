import React, { Component } from 'react';
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from 'react-apollo';
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { Header, Segment, Form, Button, Container, Dimmer, Loader, Message } from "semantic-ui-react";

import isEmail from "validator/lib/isEmail";

import utils from "../utils";
import {
  PASSWORD_MINIMUM_LENGTH,
  BAD_PASSWORDS,
} from "../constants";

import {
  SIGNUP_MUTATION,
  LOGIN_MUTATION,
} from "../graphql/Mutations";

class Login extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    formErrors: [],
    submissionInProgress: false,
    submissionFailure: "",
    shouldRedirect: false,
  };

  validate = () => {
    const errors = [];

    // Validations only necessary on sign-up page.
    if (this.props.location.pathname !== this.props.loginPath) {
      if (!this.state.fname.trim()) errors.push("First name required");
      if (!this.state.lname.trim()) errors.push("Last name required");
      if (this.state.password.trim().length < PASSWORD_MINIMUM_LENGTH)
        errors.push(`Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`);
      if (BAD_PASSWORDS.includes(this.state.password.toLowerCase()))
        errors.push("Password is far too common. Please try a better password!");

      const normalizedEmail = utils.customNormalizeEmail(this.state.email);
      if (normalizedEmail !== this.state.email.toLowerCase())
        errors.push(`Please normalize your email to "${normalizedEmail}"`);

    }

    if (!this.state.email.trim()) errors.push("Email required");
    else if (!isEmail(this.state.email)) errors.push("Email invalid");

    if (!this.state.password) errors.push("Password required");

    return errors;
  };

  handleChange = (data) => {
    this.setState(data);
  };

  _meAuthQueryUpdate = (proxy, { data: { login: { user } } }) => {
    if (user) {
      proxy.writeQuery({ query: this.props.meAuthQuery, data: { me: user } });
    }
  };

  _confirm = async () => {
    const formErrors = this.validate();
    this.setState({ formErrors });

    if (formErrors.length) return;

    // Login
    if (this.props.location.pathname === this.props.loginPath) {
      this.setState({ submissionInProgress: true });
      try {
        const result = await this.props.loginMutation({
          variables: {
            email: this.state.email,
            password: this.state.password,
          },
          update: this._meAuthQueryUpdate,
        });

        const { token } = result.data.login;
        utils.writeTokenLocalStorage(token);
        this.setState({ shouldRedirect: true });

      } catch (error) {
        this.setState({ submissionInProgress: false, submissionFailure: error.message });
      }

    // Signup
    } else {
      this.setState({ submissionInProgress: true });
      try {
        const result = await this.props.signupMutation({
          variables: {
            fname: this.state.fname,
            lname: this.state.lname,
            email: utils.customNormalizeEmail(this.state.email),
            password: this.state.password,
          },
          update: this._meAuthQueryUpdate,
        });

        const { token } = result.data.signup;
        utils.writeTokenLocalStorage(token);
        this.setState({ shouldRedirect: true });

      } catch (error) {
        this.setState({ submissionInProgress: false, submissionFailure: error.message });
      }
    }
  };

  _redirectPath = () => {
    const locationState = this.props.location.state;
    const pathname = (
      locationState && locationState.from && locationState.from.pathname
    );
    return pathname || "/";
  };

  render () {
    if (this.state.shouldRedirect) {
      return (
        <Redirect to={this._redirectPath()} />
      )
    }

    // Necessary in order to deal with "Update Blocking". See:
    // https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
    const loginPage = this.props.location.pathname === this.props.loginPath;

    return (
      <div>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Please {loginPage ? "login" : "sign-up"} below!
          </Header.Content>
        </Header>
        <Segment>
          <Dimmer inverted active={this.state.submissionInProgress}>
            <Loader />
          </Dimmer>
          <Form>
            {!loginPage && (
              <Form.Input
                required={!loginPage}
                value={this.state.fname}
                onChange={e => this.handleChange({ fname: e.target.value })}
                label="First Name"
                autoComplete="given-name"
                placeholder="Your first name"
              />
            )}
            {!loginPage && (
              <Form.Input
                required={!loginPage}
                value={this.state.lname}
                onChange={e => this.handleChange({ lname: e.target.value })}
                label="Last Name"
                autoComplete="family-name"
                placeholder="Your last name"
              />
            )}
            <Form.Input
              required={true}
              value={this.state.email}
              error={!loginPage && !(this.state.email === "" || isEmail(this.state.email))}
              onChange={e => this.handleChange({ email: e.target.value })}
              label="Email"
              autoComplete="email"
              placeholder="Your email"
            />
            <Form.Input
              required={true}
              value={this.state.password}
              onChange={e => this.handleChange({ password: e.target.value })}
              label="Password"
              autoComplete={loginPage ? "current-password" : "new-password"}
              placeholder={loginPage ?
                "Enter your password" : `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`
              }
              type="password"
            />
            {this.state.submissionFailure &&
            <Container>
              <Message negative>
                <Message.Header>Error</Message.Header>
                {this.state.submissionFailure}
              </Message>
            </Container>
            }
            {this.state.formErrors.length !== 0 &&
            <Container>
              <Message negative>
                <Message.Header>Form Errors</Message.Header>
                <ul>
                  {this.state.formErrors.map(errorMessage =>
                   <li>{errorMessage}</li>)}
                </ul>
              </Message>
            </Container>
            }
            <Container textAlign="right">
              <Button
                primary
                type="submit"
                onClick={() => this._confirm()}
              >
                {loginPage ? "Login" : "Sign-up"}
              </Button>
              <br />
              <br />
              <Link
                to={loginPage ? "/signup" : "/login"}>
                Click here if you {loginPage ? "need to make" : "already have"} an account.
              </Link>
            </Container>
          </Form>
        </Segment>
      </div>
    );
  }
}

Login.propTypes = {
  signupMutation: PropTypes.func.isRequired,
  loginMutation: PropTypes.func.isRequired,
  loginPath: PropTypes.string.isRequired,
};

export default compose(
  withRouter,
  withApollo,
  graphql(SIGNUP_MUTATION, { name: 'signupMutation' }),
  graphql(LOGIN_MUTATION, { name: 'loginMutation' }),
)(Login);
