import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../../utils";

import {
  UNIT_WORDS,
} from "../../../constants";

const ChallengeCompleteDetailAnswers = props => (
  <List divided relaxed>
    {props.surveyQuestionAnswers.map(row => (
      <List.Item key={row.questionid}>
        <List.Icon name="clipboard check" size="large" color="blue" />
        <List.Content>
          <p>
            <b>{row.question}</b>
            <br />
            {row.skip ?
              "You skipped this survey question."
              :
              `Response: ${utils.unitWorder(row.value, UNIT_WORDS[row.unit], true)}`
            }
            {row.detail &&
              <span>
                <br />
                {`Note: "${row.detail}"`}
              </span>
            }
          </p>
        </List.Content>
      </List.Item>
    ))}
  </List>
);

ChallengeCompleteDetailAnswers.propTypes = {
  surveyQuestionAnswers: PropTypes.arrayOf(PropTypes.shape({
    questionid: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    skip: PropTypes.bool.isRequired,
    value: PropTypes.number,
    unit: PropTypes.string,
    detail: PropTypes.string,
  })).isRequired,
};

export default ChallengeCompleteDetailAnswers;
