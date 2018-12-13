import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import withAuth from "../../../../AuthHOC";

import {
  QUESTION_STATUS_DROPDOWN,
} from "../../../../../constants";

class QuestionContributionOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authors: props.userTokenData.id,  // Fixed
      statuses: [],
    };

    this.handleStatusesChange = (e, { value }) => {
      this.setState({ statuses: value });
    };

    // Immediately call handleChange() on mount so user can search immediately.
    this.componentDidMount = () => {
      this.props.handleChange(this.state);
    };

    this.componentDidUpdate = () => {
      this.props.handleChange(this.state);
    };
  }

  render() {
    return (
      <Form>
        <Form.Group inline widths="equal">
          <Form.Input
            label="Author"
            value="(Me)"
          />
          <Form.Select
            label="Status (or)"
            placeholder="Any"
            options={QUESTION_STATUS_DROPDOWN}
            value={this.state.statuses}
            onChange={this.handleStatusesChange}
            multiple
            selection
          />
        </Form.Group>
      </Form>
    );
  }
}

QuestionContributionOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withAuth(QuestionContributionOptions);
