import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import {
  FEEDBACK_TYPE_DROPDOWN,
  FEEDBACK_STATUS_DROPDOWN,
} from "../../../../../constants";

class FeedbackSearchOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authorsText: "",
      authors: [],
      reviewersText: "",
      reviewers: [],
      statuses: [],
      types: [],
    };

    this.handleAuthorsChange = (e, { value }) => {
      this.setState({
        authorsText: value,
        authors: value.replace(/\s/, "").split(","),
      });
    };

    this.handleReviewersChange = (e, { value }) => {
      this.setState({
        reviewersText: value,
        reviewers: value.replace(/\s/, "").split(","),
      });
    };

    this.handleStatusesChange = (e, { value }) => {
      this.setState({ statuses: value });
    };

    this.handleTypesChange = (e, { value }) => {
      this.setState({ types: value });
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
            label="Authors (or)"
            placeholder="Any"
            value={this.state.authorsText}
            onChange={this.handleAuthorsChange}
          />
          <Form.Input
            label="Reviewers (or)"
            placeholder="Any"
            value={this.state.reviewersText}
            onChange={this.handleReviewersChange}
          />
          <Form.Select
            label="Type (or)"
            placeholder="Any"
            options={FEEDBACK_TYPE_DROPDOWN}
            value={this.state.types}
            onChange={this.handleTypesChange}
            multiple
            selection
          />
          <Form.Select
            label="Status (or)"
            placeholder="Any"
            options={FEEDBACK_STATUS_DROPDOWN}
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

FeedbackSearchOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default FeedbackSearchOptions;
