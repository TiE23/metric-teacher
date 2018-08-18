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
} from "../../../constants";

class QuestionSearchOptions extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      direction: null,
      types: [],
      statuses: [],
      flags: [],
      difficulties: [],
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
      <Form>
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
            options={DIRECTION_DROPDOWN}
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
            label="Flag (exact match)"
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
      </Form>
    );
  }
}

QuestionSearchOptions.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default QuestionSearchOptions;
