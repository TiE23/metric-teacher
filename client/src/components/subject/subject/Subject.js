import React from "react";
import PropTypes from "prop-types";

const Subject = props =>  (
  <p>
    {props.subjectData.measurementDescription}
    <br />
    {props.subjectData.description}
  </p>
);

Subject.propTypes = {
  subjectData: PropTypes.shape({
    measurementDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Subject;
