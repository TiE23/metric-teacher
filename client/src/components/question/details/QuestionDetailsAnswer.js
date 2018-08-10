import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../../utils";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../../constants";

const QuestionDetailsAnswer = class QuestionDetailsAnswer extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <List divided>
        {this.props.type === QUESTION_TYPE_WRITTEN &&
        <List.Item>
          <List.Icon name="pencil alternate" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Choices Available</List.Header>
            <List.Description>
              {(this.props.multiple && this.props.multiple.choicesOffered) || "Null"}
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {this.props.type === QUESTION_TYPE_WRITTEN &&
        <List.Item>
          <List.Icon name="list" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Choices</List.Header>
            {!this.props.multiple ?
              <p>No choices!</p>
              :
              <List.List>
                {this.props.multiple.choices.map((choice, index) => (
                  <List.Item key={`${choice.written || choice.value}_${choice.unit}`}>
                    <List.Icon
                      name={index === 0 ? "check circle" : "remove circle"}
                      color={index === 0 ? "olive" : "red"}
                      size="large"
                      verticalAlign="top"
                    />
                    <List.Content>
                      <List.Description>
                        {choice.written || `${choice.value}${utils.unitInitilizer(choice.unit)}`}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List.List>
            }
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_WRITTEN &&
        (this.props.editMode || this.props.detail)) &&
        <List.Item>
          <List.Icon name="sticky note" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Detail</List.Header>
            <List.Description>{this.props.detail || "..."}</List.Description>
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_CONVERSION ||
        this.props.type === QUESTION_TYPE_SURVEY) &&
        <List.Item>
          <List.Icon name="exchange" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.type === QUESTION_TYPE_SURVEY ? "Survey " : ""}Conversion Requirements
            </List.Header>
            <List.List>
              <List.Item>
                <List.Icon name="dot circle outline" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>To Unit</List.Header>
                  <List.Description>
                    {utils.unitInitilizer(this.props.unit)}
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="crosshairs" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>Accuracy</List.Header>
                  <List.Description>{this.props.accuracy}</List.Description>
                </List.Content>
              </List.Item>
            </List.List>
          </List.Content>
        </List.Item>
        }
      </List>
    );
  }
};

QuestionDetailsAnswer.propTypes = {
  type: PropTypes.number.isRequired,
  detail: PropTypes.string,
  accuracy: PropTypes.number,
  unit: PropTypes.string,
  multiple: PropTypes.shape({
    choicesOffered: PropTypes.number.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      unit: PropTypes.string.isRequired,
      written: PropTypes.string,
      value: PropTypes.number,
    })),
  }),
  editMode: PropTypes.bool,
};

QuestionDetailsAnswer.defaultProps = {
  detail: null,
  accuracy: null,
  unit: null,
  multiple: null,
  editMode: false,
};

export default QuestionDetailsAnswer;
