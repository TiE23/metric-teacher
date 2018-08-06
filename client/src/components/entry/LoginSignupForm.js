import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Header,
  Segment,
  Form,
  Container,
  Dimmer,
  Loader,
  Message,
} from "semantic-ui-react";

import utils from "../../utils";

import {
  PASSWORD_MINIMUM_LENGTH,
} from "../../constants";

import LoadingButton from "..//misc/LoadingButton";

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
      email: this.state.email,
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
      <Segment textAlign="left" >
        <Dimmer inverted active={this.props.loading}>
          <Loader />
        </Dimmer>
        <Header size="huge" textAlign="center">
          Please {this.props.loginPage ? "login" : "sign-up"} below!
        </Header>
        <Form>
          {!this.props.loginPage &&
            <Form.Input
              required={!this.props.loginPage}
              value={this.state.fname}
              onChange={e => this.handleChange({ fname: e.target.value })}
              label="First Name"
              autoComplete="given-name"
              placeholder="Your first name"
            />
          }
          {!this.props.loginPage &&
            <Form.Input
              required={!this.props.loginPage}
              value={this.state.lname}
              onChange={e => this.handleChange({ lname: e.target.value })}
              label="Last Name"
              autoComplete="family-name"
              placeholder="Your last name"
            />
          }
          <Form.Input
            // Here to help password managers work properly on signup. https://goo.gl/9p2vKq
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
          <Container textAlign="right">
            <LoadingButton
              onClick={() => this.submit()}
              buttonText={this.props.loginPage ? "Login" : "Sign-up"}
              buttonProps={{
                primary: true,
                type: "submit",
              }}
              loading={this.props.loading}
            />
            <br />
            <br />
            <Link
              to={this.props.loginPage ? "/signup" : "/login"}
            >
              Click here if you {this.props.loginPage ? "need to make" : "already have"} an account.
            </Link>
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
            {this.state.formErrors.map(errorMessage =>
              <li key={errorMessage}>{errorMessage}</li>)}
          </ul>
        </Message>
        }
      </Segment>
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
