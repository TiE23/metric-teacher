import React from "react";
import PropTypes from "prop-types";

const Subject = (props) => {
  const { subjectData } = props;

  return (
    <span>
      <b>Subject</b>: {subjectData.name} ({subjectData.id})
    </span>
  );
};

Subject.propTypes = {
  subjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default Subject;
