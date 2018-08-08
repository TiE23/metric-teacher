import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../utils";

import {
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../constants";

const QuestionReviewDetailsAnswer = props => (
  <List divided>
    {props.qaAnswerData.data.multiple &&
    <List.Item>
      <List.Icon name="pencil alternate" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>Choices Available</List.Header>
        <List.Description>{props.qaAnswerData.data.multiple.choicesOffered}</List.Description>
      </List.Content>
    </List.Item>
    }
    {props.qaAnswerData.data.multiple &&
    <List.Item>
      <List.Icon name="list" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Choices</List.Header>
        <List.List>
          {props.qaAnswerData.data.multiple.choices.map((choice, index) => (
            <List.Item key={`${choice.written || choice.value}_${choice.unit}`}>
              <List.Icon
                name={index === 0 ? "check circle" : "remove circle"}
                color={index === 0 ? "olive" : "red"}
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Description>
                  {choice.written || `${choice.value}${utils.unitInitilizer(choice.unit)}`}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List.List>
      </List.Content>
    </List.Item>
    }
    {props.qaAnswerData.detail &&
    <List.Item>
      <List.Icon name="sticky note" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>Detail</List.Header>
        <List.Description>{props.qaAnswerData.detail}</List.Description>
      </List.Content>
    </List.Item>
    }
    {(props.qaType === QUESTION_TYPE_CONVERSION || props.qaType === QUESTION_TYPE_SURVEY) &&
    <List.Item>
      <List.Icon name="exchange" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>
          {props.qaType === QUESTION_TYPE_SURVEY ? "Survey " : ""}Conversion Requirements
        </List.Header>
        <List.List>
          <List.Item>
            <List.Icon name="dot circle outline" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>To Unit</List.Header>
              <List.Description>
                {utils.unitInitilizer(props.qaAnswerData.data.unit)}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="crosshairs" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>Accuracy</List.Header>
              <List.Description>{props.qaAnswerData.data.accuracy}</List.Description>
            </List.Content>
          </List.Item>
        </List.List>
      </List.Content>
    </List.Item>
    }
  </List>
);

QuestionReviewDetailsAnswer.propTypes = {
  qaAnswerData: PropTypes.shape({
    detail: PropTypes.string,
    data: PropTypes.shape({
      accuracy: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
      multiple: PropTypes.shape({
        choicesOffered: PropTypes.number.isRequired,
        choices: PropTypes.arrayOf(PropTypes.shape({
          unit: PropTypes.string.isRequired,
          written: PropTypes.string,
          value: PropTypes.number,
        })),
      }),
    }).isRequired,
  }).isRequired,
  qaType: PropTypes.number.isRequired,
};

export default QuestionReviewDetailsAnswer;
