import React from "react";
import PropTypes from "prop-types";

const ChallengeContainer = props => (
  <div>
    <p>ChallengeContainer</p>
    <p>StudentId: {props.studentId}</p>
    <p>
      {JSON.stringify(props.selectedSubSubjectIds)}
    </p>
  </div>
);

ChallengeContainer.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ChallengeContainer;
