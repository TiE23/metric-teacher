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
        queryInfo={props.queryInfo}
        studentId={props.studentId}
      />
    ))
  );
};

SubjectsList.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
  studentId: PropTypes.string,
};

SubjectsList.defaultProps = {
  subjectsData: null,
  studentId: null,
};

export default SubjectsList;
