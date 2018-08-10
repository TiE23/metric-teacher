import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Icon, Input } from "semantic-ui-react";

import utils from "../../../utils";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../../constants";

class QuestionDetailsQuestion extends PureComponent {
  constructor(props) {
    super(props);

    // Hack-solving frustrating CSS issues with input widths
    this.width100 = { width: "100%" };

    this.handleTextChange = (e, { value }) => {
      if (this.props.handleQuestionDataChange) {
        this.props.handleQuestionDataChange({ text: value });
      }
    };

    this.handleDetailChange = (e, { value }) => {
      if (this.props.handleQuestionDataChange) {
        this.props.handleQuestionDataChange({ detail: value });
      }
    };

    // TODO - range change. Use isDecimal.
  }

  render() {
    return (
      <List divided>
        {((this.props.type === QUESTION_TYPE_WRITTEN ||
        this.props.type === QUESTION_TYPE_SURVEY) && (this.props.text || this.props.editMode)) &&
        <List.Item>
          <List.Icon name="comment" size="large" verticalAlign="top" />
          <List.Content style={this.width100}>
            <List.Header>Text {this.props.editMode && <Icon name="pencil" />}</List.Header>
            <List.Description>
              {this.props.editMode ?
                <div style={this.width100}>
                  <Input
                    onChange={this.handleTextChange}
                    value={this.props.text}
                    placeholder="..."
                    transparent
                    fluid
                  />
                </div>
                :
                <span>{(this.props.text && `"${this.props.text}"`) || "..."}</span>
              }
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_CONVERSION &&
        (this.props.detail || this.props.editMode)) &&
        <List.Item>
          <List.Icon name="comment alternate" size="large" verticalAlign="top" />
          <List.Content style={this.width100}>
            <List.Header>Detail {this.props.editMode && <Icon name="pencil" />}</List.Header>
            <List.Description>
              {this.props.editMode ?
                <div style={this.width100}>
                  <Input
                    onChange={this.handleDetailChange}
                    value={this.props.detail}
                    placeholder="..."
                    transparent
                    fluid
                  />
                </div>
                :
                <span>{(this.props.detail && `"${this.props.detail}"`) || "..."}</span>
              }
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {((this.props.type === QUESTION_TYPE_CONVERSION || this.props.type === QUESTION_TYPE_SURVEY)
        && (this.props.range || this.props.editMode)) &&
        <List.Item>
          <List.Icon name="chart bar" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.type === QUESTION_TYPE_CONVERSION ? "Conversion" : "Survey"} Range
            </List.Header>
            <List.List>
              <List.Item>
                <List.Icon name="chevron down" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>Lower Range</List.Header>
                  <List.Description>
                    {(this.props.range && this.props.range.lower) || "Null"}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="chevron up" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>Upper Range</List.Header>
                  <List.Description>
                    {(this.props.range && this.props.range.upper) || "Null"}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dot circle" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>From Unit</List.Header>
                  <List.Description>
                    {(this.props.range && utils.unitInitilizer(this.props.range.unit)) || "..."}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="signal" size="large" verticalAlign="top" rotated="clockwise" />
                <List.Content>
                  <List.Header>Step</List.Header>
                  <List.Description>
                    {(this.props.range && this.props.range.step) || "Null"}
                  </List.Description>
                </List.Content>
              </List.Item>
            </List.List>
          </List.Content>
        </List.Item>
        }
      </List>
    );
  }
}

QuestionDetailsQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  range: PropTypes.shape({
    upper: PropTypes.number.isRequired,
    lower: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  }),
  editMode: PropTypes.bool,
  handleQuestionDataChange: PropTypes.func,
};

QuestionDetailsQuestion.defaultProps = {
  range: null,
  editMode: false,
  handleQuestionDataChange: null,
};

export default QuestionDetailsQuestion;
