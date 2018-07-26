import React from "react";
import PropTypes from "prop-types";

const SubSubject = props =>  (
  <p>
    {props.subSubjectData.description}
  </p>
);

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubSubject;
