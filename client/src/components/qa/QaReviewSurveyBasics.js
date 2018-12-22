import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../utils";

import {
  QUESTION_FLAG_USER_DETAIL_OPTIONAL,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../constants";

const QaReviewSurveyBasics = props => (
  <List>
    <List.Item>
      <b>Answer</b>: {props.answer ? utils.choiceWorder(props.answer) : <i>None</i>}
    </List.Item>
    {(props.detail || !!(props.questionFlags &
      (QUESTION_FLAG_USER_DETAIL_OPTIONAL + QUESTION_FLAG_USER_DETAIL_REQUIRED))
    ) &&
    <List.Item>
      <b>Note</b>:{" "}
      {props.detail ?
        <span>&quot;{props.detail}&quot;</span>
        :
        <span><i>None</i></span>
      }
    </List.Item>
    }
  </List>
);

QaReviewSurveyBasics.propTypes = {
  answer: PropTypes.shape({
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }),
  detail: PropTypes.string,
  questionFlags: PropTypes.number,
};

QaReviewSurveyBasics.defaultProps = {
  answer: null,
  detail: null,
  questionFlags: 0,
};

export default QaReviewSurveyBasics;
