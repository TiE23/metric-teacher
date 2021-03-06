import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import {
  SUBJECT_DROPDOWN,
  DIRECTION_DROPDOWN,
  QUESTION_TYPE_DROPDOWN,
  QUESTION_STATUS_DROPDOWN,
  QUESTION_FLAG_DROPDOWN,
  QUESTION_DIFFICULTY_DROPDOWN,
} from "../../../../../constants";

class QuestionSearchOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ids: null,
      authors: null,
      reviewers: null,
      questionText: null,
      answerText: null,
      subjects: [],
      direction: null,
      types: [],
      statuses: [],
      flags: [],
      difficulties: [],
    };

    // Add a third option for either direction. This sets undefined value, and as a result must be
    // given a key property for the Dropdown component to work.
    this.nullableDirectionDropdown = [
      ...DIRECTION_DROPDOWN,
      { key: "either", value: undefined, text: "Either", icon: "sync alternate" },
    ];

    this.handleIdsChange = (e, { value }) => {
      this.setState({ ids: value });
    };

    this.handleAuthorsChange = (e, { value }) => {
      this.setState({ authors: value });
    };

    this.handleReviewersChange = (e, { value }) => {
      this.setState({ reviewers: value });
    };

    this.handleQuestionTextChange = (e, { value }) => {
      this.setState({ questionText: value });
    };

    this.handleAnswerTextChange = (e, { value }) => {
      this.setState({ answerText: value });
    };

    this.handleSubjectsChange = (e, { value }) => {
      this.setState({ subjects: value });
    };

    this.handleDirectionChange = (e, { value }) => {
      this.setState({ direction: value });
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

    this.handleDifficultiesChange = (e, { value }) => {
      this.setState({ difficulties: value });
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
            label="Authors"
            placeholder="Any"
            value={this.state.authors || ""}
            onChange={this.handleAuthorsChange}
            fluid
          />
          <Form.Input
            label="Reviewers"
            placeholder="Any"
            value={this.state.reviewers || ""}
            onChange={this.handleReviewersChange}
            fluid
          />
          <Form.Input
            label="Question Text"
            placeholder="Any"
            value={this.state.questionText || ""}
            onChange={this.handleQuestionTextChange}
            fluid
          />
          <Form.Input
            label="Answer Text"
            placeholder="Any"
            value={this.state.answerText || ""}
            onChange={this.handleAnswerTextChange}
            fluid
          />
        </Form.Group>
        <Form.Group inline widths="equal">
          <Form.Select
            label="Subject (or)"
            placeholder="Any"
            options={SUBJECT_DROPDOWN}
            value={this.state.subjects}
            onChange={this.handleSubjectsChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Direction"
            placeholder="Any"
            options={this.nullableDirectionDropdown}
            value={this.state.direction}
            onChange={this.handleDirectionChange}
            fluid
            selection
          />
          <Form.Select
            label="Type (or)"
            placeholder="Any"
            options={QUESTION_TYPE_DROPDOWN}
            value={this.state.types}
            onChange={this.handleTypesChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Status (or)"
            placeholder="Any"
            options={QUESTION_STATUS_DROPDOWN}
            value={this.state.statuses}
            onChange={this.handleStatusesChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Flag (and)"
            placeholder="Any"
            options={QUESTION_FLAG_DROPDOWN}
            value={this.state.flags}
            onChange={this.handleFlagsChange}
            fluid
            multiple
            selection
          />
          <Form.Select
            label="Difficulty (or)"
            placeholder="Any"
            options={QUESTION_DIFFICULTY_DROPDOWN}
            value={this.state.difficulties}
            onChange={this.handleDifficultiesChange}
            fluid
            multiple
            selection
          />
        </Form.Group>
      </React.Fragment>
    );
  }
}

QuestionSearchOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default QuestionSearchOptions;
