import React from "react";
import PropTypes from "prop-types";

import Subject from "./Subject";

const SubjectsList = (props) => {
  if (!props.subjectsData) return null;

  return (
    props.subjectsData.map(subjectData => (
      <Subject
        key={subjectData.id}
        subjectData={subjectData}
        query={props.query}
        studentId={props.studentId}
      />
    ))
  );
};

SubjectsList.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string,
};

SubjectsList.defaultProps = {
  subjectsData: null,
  query: null,
  studentId: null,
};

export default SubjectsList;
