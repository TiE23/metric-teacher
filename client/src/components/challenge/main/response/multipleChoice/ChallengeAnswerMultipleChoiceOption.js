import React from "react";
import PropTypes from "prop-types";

const ChallengeAnswerMultipleChoiceOption = props => (
  <p>#{props.number} - {props.text}</p>
);

ChallengeAnswerMultipleChoiceOption.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default ChallengeAnswerMultipleChoiceOption;
