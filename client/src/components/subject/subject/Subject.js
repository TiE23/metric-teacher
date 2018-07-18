import React from "react";
import PropTypes from "prop-types";

const Subject = (props) => {
  const { subjectData } = props;

  return (
    <div>{subjectData.name} ({subjectData.id})</div>
  );
};

Subject.propTypes = {
  subjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Subject.defaultProps = {
};

export default Subject;
