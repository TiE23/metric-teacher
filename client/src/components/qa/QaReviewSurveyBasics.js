import React from "react";
import PropTypes from "prop-types";
import { List } from "semantic-ui-react";

import utils from "../../utils";

const QaReviewSurveyBasics = props => (
  <List>
    <List.Item>
      <b>Answer</b>: {utils.choiceWorder(props.answer)}
    </List.Item>
    {props.detail &&
    <List.Item>
      <b>Note</b>: &quot;{props.detail}&quot;
    </List.Item>
    }
  </List>
);

QaReviewSurveyBasics.propTypes = {
  answer: PropTypes.shape({
    value: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  detail: PropTypes.string,
};

QaReviewSurveyBasics.defaultProps = {
  detail: null,
};

export default QaReviewSurveyBasics;
