import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../../utils";

import {
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../../constants";

const QuestionDetailsQuestion = props => (
  <List divided>
    {props.text &&
    <List.Item>
      <List.Icon name="comment" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Text</List.Header>
        <List.Description>&quot;{props.text}&quot;</List.Description>
      </List.Content>
    </List.Item>
    }
    {props.detail &&
    <List.Item>
      <List.Icon name="comment alternate" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Detail</List.Header>
        <List.Description>&quot;{props.detail}&quot;</List.Description>
      </List.Content>
    </List.Item>
    }
    {(props.type === QUESTION_TYPE_CONVERSION || props.type === QUESTION_TYPE_SURVEY) &&
    <List.Item>
      <List.Icon name="chart bar" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>
          {props.type === QUESTION_TYPE_CONVERSION ? "Conversion" : "Survey"} Range
        </List.Header>
        <List.List>
          <List.Item>
            <List.Icon name="chevron down" size="large" verticalAlign="top" />
            <List.Content>
              <List.Header>Lower Range</List.Header>
              <List.Description>{props.range.lower}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="chevron up" size="large" verticalAlign="top" />
            <List.Content>
              <List.Header>Upper Range</List.Header>
              <List.Description>{props.range.upper}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="dot circle" size="large" verticalAlign="top" />
            <List.Content>
              <List.Header>From Unit</List.Header>
              <List.Description>{utils.unitInitilizer(props.range.unit)}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Icon name="signal" size="large" verticalAlign="top" rotated="clockwise" />
            <List.Content>
              <List.Header>Step</List.Header>
              <List.Description>{props.range.step}</List.Description>
            </List.Content>
          </List.Item>
        </List.List>
      </List.Content>
    </List.Item>
    }
  </List>
);

QuestionDetailsQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  range: PropTypes.shape({
    upper: PropTypes.number.isRequired,
    lower: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  }).isRequired,
};

export default QuestionDetailsQuestion;
