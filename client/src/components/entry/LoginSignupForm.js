import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Dimmer,
  Divider,
  Form,
  Header,
  Icon,
  Loader,
  Message,
  Segment,
} from "semantic-ui-react";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";
import SecurityDetailModal from "../misc/security/SecurityDetailModal";

import {
  SITE_NAME,
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_LOGIN,
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

  validate(variables) {
    // Construct the form checked values.
    return utils.userDetailFormValidator(
      {
        ...variables,
        email: this.props.loginPage ? { old: this.state.email } : { new: this.state.email },
        password: this.props.loginPage ?
          { old: this.state.password } : { new: this.state.password },
      },
      {
        fname: !this.props.loginPage,
        lname: !this.props.loginPage,
        email: {
          new: !this.props.loginPage,
          old: this.props.loginPage,
        },
        password: {
          new: !this.props.loginPage,
          old: this.props.loginPage,
        },
      },
    );
  }

  handleChange(data) {
    this.setState(data);
  }

  submit() {
    const variables = {
      fname: !this.props.loginPage ? this.state.fname : undefined,
      lname: !this.props.loginPage ? this.state.lname : undefined,
      email: this.state.email.toLocaleLowerCase(),
      password: this.state.password,
    };
    const formErrors = this.validate(variables);
    this.setState({ formErrors });

    // Fire off the mutation if everything was acceptable.
    if (formErrors.length === 0) {
      this.props.onSubmit(variables);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Segment>
          <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
            <Icon
              name={this.props.loginPage ? "sign in" : "signup"}
              color={PAGE_ICON_COLOR_LOGIN}
            />
            {this.props.loginPage ? "Log-in to your account" : "Sign Up"}
          </Header>
          <Form>
            {!this.props.loginPage &&
              <React.Fragment>
                <Form.Input
                  value={this.state.fname}
                  onChange={e => this.handleChange({ fname: e.target.value })}
                  autoComplete="given-name"
                  placeholder="First name (optional)"
                  icon="user"
                  iconPosition="left"
                />
                <Form.Input
                  value={this.state.lname}
                  onChange={e => this.handleChange({ lname: e.target.value })}
                  autoComplete="family-name"
                  placeholder="Last name (optional)"
                  icon="users"
                  iconPosition="left"
                />
                <Divider />
              </React.Fragment>
            }
            <Form.Input
              // Here to help password managers work properly on signup. https://goo.gl/9p2vKq
              required
              value={this.state.email}
              onChange={e => this.handleChange({ email: e.target.value })}
              autoComplete="email"
              placeholder={`E-mail address${this.props.loginPage ? "" : " (required)"}`}
              icon="mail"
              iconPosition="left"
            />
            <Form.Input
              required
              type="password"
              value={this.state.password}
              onChange={e => this.handleChange({ password: e.target.value })}
              autoComplete={this.props.loginPage ? "current-password" : "new-password"}
              placeholder="Password"
              icon="key"
              iconPosition="left"
            />
            <LoadingButton
              onClick={() => this.submit()}
              buttonText={this.props.loginPage ? "Log-in" : "Sign Up"}
              buttonProps={{
                primary: true,
                type: "submit",
                fluid: true,
              }}
              loading={this.props.loading}
            />
            <br />
            <Container textAlign="right">
              {this.props.loginPage ?
                <span>
                  New to us? <Link to="/signup">Sign Up!</Link>
                </span>
                :
                <span>
                  Returning? <Link to="login">Log-in!</Link>
                </span>
              }
            </Container>
            <Container>
              <SecurityDetailModal>
                <span style={{ cursor: "pointer" }}>
                  <Icon name="lock" /> Security on {SITE_NAME}?
                </span>
              </SecurityDetailModal>
            </Container>
          </Form>
          {this.props.error &&
          <Message attached negative>
            <Message.Header>Error</Message.Header>
            {this.props.error.message}
          </Message>
          }
          {this.state.formErrors.length !== 0 &&
          <Message attached negative>
            <Message.Header>Form Errors</Message.Header>
            <ul>
              {this.state.formErrors.map(errorMessage => (
                <li key={errorMessage}>{errorMessage}</li>
              ))}
            </ul>
          </Message>
          }
          <Dimmer inverted active={this.props.loading}>
            <Loader />
          </Dimmer>
        </Segment>
      </React.Fragment>
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
