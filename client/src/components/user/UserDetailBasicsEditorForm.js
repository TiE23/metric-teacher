import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Dimmer, Loader, Message } from "semantic-ui-react";

import withAuth from "../AuthHOC";
import utils from "../../utils";

import {
  PASSWORD_MINIMUM_LENGTH,
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
} from "../../constants";

import LoadingButton from "../misc/LoadingButton";
import UserStateEditorModal from "../tools/user/UserStateEditorModal";

class UserDetailBasicsEditorForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.initUserData.email,
      passwordNew: "",
      passwordOld: "",
      fname: props.initUserData.fname,
      lname: props.initUserData.lname,
      honorific: props.initUserData.honorific,
      formErrors: [],
    };

    this.handleChange = (data) => {
      this.setState(data);
    };

    this.validate = (variables) => {
      const { initUserData, userTokenData } = this.props;

      // Keep email lowercase at all times.
      const lowercaseVariableEmail = variables.email && variables.email.toLocaleLowerCase();
      const lowercaseStateEmail = this.state.email.toLocaleLowerCase();
      const lowercaseInitEmail = initUserData.email.toLocaleLowerCase();

      // Construct the form checked values.
      return utils.userDetailFormValidator(
        { ...variables, email: { new: lowercaseVariableEmail } }, // Switch .email to .email.new
        {
          fname: this.state.fname !== initUserData.fname,
          lname: this.state.lname !== initUserData.lname,
          email: {
            new: lowercaseStateEmail !== lowercaseInitEmail,
          },
          password: {
            new: !!this.state.passwordNew,
            old: (
              userTokenData.type < USER_TYPE_MODERATOR ||
              (initUserData.type === USER_TYPE_MODERATOR && userTokenData.type < USER_TYPE_ADMIN)
            ) && (!!this.state.passwordNew || lowercaseStateEmail !== lowercaseInitEmail),
          },
        },
      );
    };

    this.submit = () => {
      // Keep email lowercase at all times.
      const lowercaseStateEmail = this.state.email.toLocaleLowerCase();
      const lowercaseInitEmail = this.props.initUserData.email.toLocaleLowerCase();

      // Construct the variable values.
      const variables = {
        honorific: this.state.honorific !== this.props.initUserData.honorific ?
          this.state.honorific : undefined,
        fname: this.state.fname !== null && this.state.fname !== this.props.initUserData.fname ?
          this.state.fname : undefined,
        lname: this.state.lname !== null && this.state.lname !== this.props.initUserData.lname ?
          this.state.lname : undefined,
        email: lowercaseStateEmail !== lowercaseInitEmail ? lowercaseStateEmail : undefined,
        password: this.state.passwordNew || this.state.passwordOld ?
          {
            new: this.state.passwordNew || undefined,
            old: this.state.passwordOld || undefined,
          } : undefined,
      };

      const formErrors = this.validate(variables);
      this.setState({ formErrors });

      // Fire off the mutation if everything was acceptable.
      if (formErrors.length === 0) {
        this.props.onSubmit(variables);
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form className="attached fluid segment">
          <Dimmer inverted active={this.props.loading}>
            <Loader />
          </Dimmer>
          {this.props.initUserData.type === 1 &&
          <Form.Input
            value={this.state.honorific}
            onChange={e => this.handleChange({ honorific: e.target.value })}
            label="Honorific"
            placeholder="Honorific Prefix (ex: Mr., Ms., Prof., etc)"
          />
          }
          <Form.Input
            value={this.state.fname}
            onChange={e => this.handleChange({ fname: e.target.value })}
            label="First Name"
            autoComplete="given-name"
            placeholder="Your first name"
          />
          <Form.Input
            value={this.state.lname}
            onChange={e => this.handleChange({ lname: e.target.value })}
            label="Last Name"
            autoComplete="family-name"
            placeholder="Your last name"
          />
          <Form.Input
            // Here to help password managers work properly on signup. https://goo.gl/9p2vKq
            value={this.state.email}
            onChange={e => this.handleChange({ email: e.target.value })}
            label="Email"
            autoComplete="email"
            placeholder="Your email"
          />
          <Form.Input
            value={this.state.passwordNew}
            onChange={e => this.handleChange({ passwordNew: e.target.value })}
            label="New Password"
            autoComplete="new-password"
            placeholder={`Password must be at least ${PASSWORD_MINIMUM_LENGTH} characters long`}
            type="password"
          />
          {(this.state.email !== this.props.initUserData.email || this.state.passwordNew) &&
            <Form.Input
              value={this.state.passwordOld}
              onChange={e => this.handleChange({ passwordOld: e.target.value })}
              label="Current Password"
              autoComplete="current-password"
              placeholder="Current password required to change email or set new password"
              type="password"
            />
          }
          <Container textAlign="right">
            {this.props.userTokenData.type >= USER_TYPE_MODERATOR &&
              <UserStateEditorModal
                userId={this.props.initUserData.id}
                userType={this.props.initUserData.type}
                userStatus={this.props.initUserData.status}
                userFlags={this.props.initUserData.flags}
              >
                <p>
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "teal",
                    }}
                  >
                    <i>Edit State</i>
                  </span>
                  <br />
                  <br />
                </p>
              </UserStateEditorModal>
            }
            {typeof this.props.closeEditor === "function" &&
            <Button
              onClick={this.props.closeEditor}
              type="button"
            >
              Close
            </Button>
            }
            <LoadingButton
              onClick={this.submit}
              buttonText="Submit"
              buttonProps={{
                primary: true,
                type: "submit",
              }}
              loading={this.props.loading}
            />
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
            {this.state.formErrors.map(errorMessage => <li key={errorMessage}>{errorMessage}</li>)}
          </ul>
        </Message>
        }
      </React.Fragment>
    );
  }
}

UserDetailBasicsEditorForm.propTypes = {
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  closeEditor: PropTypes.func,
  initUserData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fname: PropTypes.string,
    lname: PropTypes.string,
    honorific: PropTypes.string,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

UserDetailBasicsEditorForm.defaultProps = {
  error: false,
  closeEditor: null,
};

export default withAuth(UserDetailBasicsEditorForm);
