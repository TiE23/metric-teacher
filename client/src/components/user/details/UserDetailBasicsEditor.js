import React, { Component } from "react";
import PropTypes from "prop-types";
import { Header, Segment, Form, Button, Container, Dimmer, Loader, Message } from "semantic-ui-react";
import { PASSWORD_MINIMUM_LENGTH } from "../../../constants";

import utils from "../../../utils";

class UserDetailBasicsEditor extends Component {
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
  }

  handleChange(data) {
    this.setState(data);
  }

  validate(variables) {
    // TODO - Set different rules for moderators and admins.
    return utils.userDetailFormValidator(
      { ...variables, emailNew: variables.email },  // Casually switch email to emailNew
      {
        fname: this.state.fname !== this.props.initUserData.fname,
        lname: this.state.lname !== this.props.initUserData.lname,
        emailNew: this.state.email !== this.props.initUserData.email,
        password: {
          new: !!this.state.passwordNew,
          old: !!this.state.passwordNew || this.state.email !== this.props.initUserData.email,
        },
      },
    );
  }

  submit() {
    const variables = {
      // TODO - Fix graphQL error by replacing null with undefined?
      honorific: this.state.honorific !== this.props.initUserData.honorific ?
        this.state.honorific : null,
      fname: this.state.fname !== this.props.initUserData.fname ? this.state.fname : null,
      lname: this.state.lname !== this.props.initUserData.lname ? this.state.lname : null,
      email: this.state.email !== this.props.initUserData.email ? this.state.email : null,
      password: this.state.passwordNew || this.state.passwordOld ?
        { new: this.state.passwordNew || null, old: this.state.passwordOld || null } : null,
    };

    // TODO Validation
    const formErrors = this.validate(variables);
    this.setState({ formErrors });

    if (formErrors.length === 0) {
      this.props.onSubmit(variables);
    }
  }

  render() {
    return (
      <div>
        <Header as="h1" textAlign="center">
          <Header.Content>
            Edit your details!
          </Header.Content>
        </Header>
        <Segment>
          <Dimmer inverted active={this.props.loading}>
            <Loader />
          </Dimmer>
          <Form>
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
                Submit
              </Button>
            </Container>
          </Form>
        </Segment>
      </div>
    );
  }
}

UserDetailBasicsEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initUserData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    honorific: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

UserDetailBasicsEditor.defaultProps = {
  error: false,
};

export default UserDetailBasicsEditor;
