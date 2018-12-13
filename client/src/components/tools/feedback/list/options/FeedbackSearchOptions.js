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
      ids: "",
      questions: "",
      authors: "",
      reviewers: "",
      statuses: [],
      types: [],
    };

    this.handleIdsChange = (e, { value }) => {
      this.setState({ ids: value });
    };

    this.handleQuestionsChange = (e, { value }) => {
      this.setState({ questions: value });
    };

    this.handleAuthorsChange = (e, { value }) => {
      this.setState({ authors: value });
    };

    this.handleReviewersChange = (e, { value }) => {
      this.setState({ reviewers: value });
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
            label="IDs"
            placeholder="Any"
            value={this.state.ids}
            onChange={this.handleIdsChange}
            fluid
          />
          <Form.Select
            label="Type (or)"
            placeholder="Any"
            options={FEEDBACK_TYPE_DROPDOWN}
            value={this.state.types}
            onChange={this.handleTypesChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Status (or)"
            placeholder="Any"
            options={FEEDBACK_STATUS_DROPDOWN}
            value={this.state.statuses}
            onChange={this.handleStatusesChange}
            fluid
            multiple
            selection
          />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Input
            label="Questions"
            placeholder="Any"
            value={this.state.questions}
            onChange={this.handleQuestionsChange}
            fluid
          />
          <Form.Input
            label="Authors"
            placeholder="Any"
            value={this.state.authors}
            onChange={this.handleAuthorsChange}
            fluid
          />
          <Form.Input
            label="Reviewers"
            placeholder="Any"
            value={this.state.reviewers}
            onChange={this.handleReviewersChange}
            fluid
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
