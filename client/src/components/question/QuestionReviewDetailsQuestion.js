import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../utils";

import {
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../constants";

const QuestionReviewDetailsQuestion = props => (
  <List divided>
    {props.qaQuestionData.text &&
    <List.Item>
      <List.Icon name="comment" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>Text</List.Header>
        <List.Description>&quot;{props.qaQuestionData.text}&quot;</List.Description>
      </List.Content>
    </List.Item>
    }
    {props.qaQuestionData.detail &&
    <List.Item>
      <List.Icon name="comment alternate" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>Detail</List.Header>
        <List.Description>&quot;{props.qaQuestionData.detail}&quot;</List.Description>
      </List.Content>
    </List.Item>
    }
    {(props.qaType === QUESTION_TYPE_CONVERSION || props.qaType === QUESTION_TYPE_SURVEY) &&
    <List.Item>
      <List.Icon name="chart bar" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>
          {props.qaType === QUESTION_TYPE_CONVERSION ? "Conversion" : "Survey"} Range
        </List.Header>
        <List.List>
          <List.Item>
            <List.Icon name="chevron down" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>Lower Range</List.Header>
              <List.Description>
                {(props.qaQuestionData.data.conversion &&
                  props.qaQuestionData.data.conversion.range.bottom.value) ||
                  (props.qaQuestionData.data.survey &&
                    props.qaQuestionData.data.survey.range.bottom.value)}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="chevron up" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>Upper Range</List.Header>
              <List.Description>
                {(props.qaQuestionData.data.conversion &&
                  props.qaQuestionData.data.conversion.range.top.value) ||
                (props.qaQuestionData.data.survey &&
                  props.qaQuestionData.data.survey.range.top.value)}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="dot circle" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header>From Unit</List.Header>
              <List.Description>
                {utils.unitInitilizer((props.qaQuestionData.data.conversion &&
                  props.qaQuestionData.data.conversion.range.top.unit) ||
                (props.qaQuestionData.data.survey &&
                  props.qaQuestionData.data.survey.range.top.unit))}
              </List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="signal" size="large" verticalAlign="middle" rotated="clockwise" />
            <List.Content>
              <List.Header>Step</List.Header>
              <List.Description>
                {(props.qaQuestionData.data.conversion &&
                  props.qaQuestionData.data.conversion.step) ||
                (props.qaQuestionData.data.survey &&
                  props.qaQuestionData.data.survey.step)}
              </List.Description>
            </List.Content>
          </List.Item>
        </List.List>
      </List.Content>
    </List.Item>
    }
  </List>
);

QuestionReviewDetailsQuestion.propTypes = {
  qaQuestionData: PropTypes.shape({
    text: PropTypes.string,
    detail: PropTypes.string,
    data: PropTypes.shape({
      conversion: PropTypes.shape({
        range: PropTypes.shape({
          bottom: PropTypes.shape({
            value: PropTypes.number.isRequired,
          }).isRequired,
          top: PropTypes.shape({
            value: PropTypes.number.isRequired,
            unit: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        step: PropTypes.number.isRequired,
      }),
      survey: PropTypes.shape({
        range: PropTypes.shape({
          bottom: PropTypes.shape({
            value: PropTypes.number.isRequired,
          }).isRequired,
          top: PropTypes.shape({
            value: PropTypes.number.isRequired,
            unit: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
        step: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
  qaType: PropTypes.number.isRequired,
};

export default QuestionReviewDetailsQuestion;
