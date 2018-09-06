import React from "react";
import PropTypes from "prop-types";

const ChallengeComplete = props => (
  <p>Challenge Complete! You answered {props.qaCount} questions.</p>
);

ChallengeComplete.propTypes = {
  qaCount: PropTypes.number.isRequired,
};

export default ChallengeComplete;
