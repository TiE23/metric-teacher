import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import {
  USER_FLAG_DROPDOWN,
  USER_STATUS_DROPDOWN,
  USER_TYPE_DROPDOWN,
} from "../../../../../constants";

class UserSearchOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ids: null,
      email: null,
      fname: null,
      lname: null,
      types: [],
      statuses: [],
      flags: [],
    };

    this.handleIdsChange = (e, { value }) => {
      this.setState({ ids: value });
    };

    this.handleEmailChange = (e, { value }) => {
      this.setState({ email: value });
    };

    this.handleFirstNameChange = (e, { value }) => {
      this.setState({ fname: value });
    };

    this.handleLastNameChange = (e, { value }) => {
      this.setState({ lname: value });
    };

    this.handleTypesChange = (e, { value }) => {
      this.setState({ types: value });
    };

    this.handleStatusesChange = (e, { value }) => {
      this.setState({ statuses: value });
    };

    this.handleFlagsChange = (e, { value }) => {
      this.setState({ flags: value });
    };

    this.componentDidUpdate = () => {
      this.props.handleChange(this.state);
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form.Group inline widths="equal">
          <Form.Input
            label="IDs"
            placeholder="Any"
            value={this.state.ids || ""}
            onChange={this.handleIdsChange}
            fluid
          />
          <Form.Input
            label="Email (like)"
            placeholder="Any"
            value={this.state.email || ""}
            onChange={this.handleEmailChange}
            fluid
          />
          <Form.Input
            label="First Name (like)"
            placeholder="Any"
            value={this.state.fname || ""}
            onChange={this.handleFirstNameChange}
            fluid
          />
          <Form.Input
            label="Last Name (like)"
            placeholder="Any"
            value={this.state.lname || ""}
            onChange={this.handleLastNameChange}
            fluid
          />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Select
            label="Type (or)"
            placeholder="Any"
            options={USER_TYPE_DROPDOWN}
            value={this.state.types}
            onChange={this.handleTypesChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Status (or)"
            placeholder="Any"
            options={USER_STATUS_DROPDOWN}
            value={this.state.statuses}
            onChange={this.handleStatusesChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Flag (and)"
            placeholder="Any"
            options={USER_FLAG_DROPDOWN}
            value={this.state.flags}
            onChange={this.handleFlagsChange}
            fluid
            multiple
            selection
          />
        </Form.Group>
      </React.Fragment>
    );
  }
}

UserSearchOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default UserSearchOptions;
