import React from "react";
import PropTypes from "prop-types";

const Enrollment = props => (
  <div>
    <p>Enrollment ID: {props.enrollmentData.id}</p>
  </div>
);

Enrollment.propTypes = {
  enrollmentData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Enrollment;
