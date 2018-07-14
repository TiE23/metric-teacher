import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header, Segment, Form, Button, Container, Dimmer, Loader, Message } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";

import utils from "../../utils";

import {
  BAD_PASSWORDS,
  PASSWORD_MINIMUM_LENGTH,
} from "../../constants";

class LoginSignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      formErrors: [],
    };
  }

  validate() {
    // TODO - Convert to utils.userDetailFormValidator()
    const errors = [];

    // Validations only necessary on sign-up page.
    if (!this.props.loginPage) {
      if (!this.state.fname.trim()) errors.push("First name required");
      if (!this.state.lname.trim()) errors.push("Last name required");
      if (this.state.password.trim().length < PASSWORD_MINIMUM_LENGTH) {
        errors.push(`Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`);
      }
      if (BAD_PASSWORDS.includes(this.state.password.toLowerCase())) {
        errors.push("Password is far too common. Please try a better password!");
      }

      // Prevent user from using tricky email addresses.
      const normalizedEmail = utils.customNormalizeEmail(this.state.email);
      if (isEmail(this.state.email) && normalizedEmail !== this.state.email.toLowerCase()) {
        errors.push(`Please normalize your email to "${normalizedEmail}"`);
      }
    }

    if (!this.state.email.trim()) errors.push("Email required");
    else if (!isEmail(this.state.email)) errors.push("Email invalid");

    if (!this.state.password) errors.push("Password required");

    return errors;
  }

  handleChange(data) {
    this.setState(data);
  }

  submit() {
    const formErrors = this.validate();
    this.setState({ formErrors });

    if (formErrors.length === 0 && this.props.loginPage) {
      this.props.onSubmit({
        email: this.state.email,
        password: this.state.password,
      });
    } else {
      this.props.onSubmit({
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
      });
    }
  }

  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Please {this.props.loginPage ? "login" : "sign-up"} below!
          </Header.Content>
        </Header>
        <Segment>
          <Dimmer inverted active={this.props.loading}>
            <Loader />
          </Dimmer>
          <Form>
            {!this.props.loginPage && (
              <Form.Input
                required={!this.props.loginPage}
                value={this.state.fname}
                onChange={e => this.handleChange({ fname: e.target.value })}
                label="First Name"
                autoComplete="given-name"
                placeholder="Your first name"
              />
            )}
            {!this.props.loginPage && (
              <Form.Input
                required={!this.props.loginPage}
                value={this.state.lname}
                onChange={e => this.handleChange({ lname: e.target.value })}
                label="Last Name"
                autoComplete="family-name"
                placeholder="Your last name"
              />
            )}
            <Form.Input
              required
              value={this.state.email}
              onChange={e => this.handleChange({ email: e.target.value })}
              label="Email"
              autoComplete="email"
              placeholder="Your email"
            />
            <Form.Input
              required
              value={this.state.password}
              onChange={e => this.handleChange({ password: e.target.value })}
              label="Password"
              autoComplete={this.props.loginPage ? "current-password" : "new-password"}
              placeholder={this.props.loginPage ?
                "Enter your password" : `Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`
              }
              type="password"
            />
            {this.props.error &&
            <Container>
              <Message negative>
                <Message.Header>Error</Message.Header>
                {this.props.error.message}
              </Message>
            </Container>
            }
            {this.state.formErrors.length !== 0 &&
            <Container>
              <Message negative>
                <Message.Header>Form Errors</Message.Header>
                <ul>
                  {this.state.formErrors.map(errorMessage =>
                    <li key={errorMessage}>{errorMessage}</li>)}
                </ul>
              </Message>
            </Container>
            }
            <Container textAlign="right">
              <Button
                primary
                type="submit"
                onClick={() => this.submit()}
              >
                {this.props.loginPage ? "Login" : "Sign-up"}
              </Button>
              <br />
              <br />
              <Link
                to={this.props.loginPage ? "/signup" : "/login"}
              >
                Click here if you {this.props.loginPage ? "need to make" : "already have"} an account.
              </Link>
            </Container>
          </Form>
        </Segment>
      </div>
    );
  }
}

LoginSignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loginPage: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

LoginSignupForm.defaultProps = {
  error: false,
};

export default LoginSignupForm;
