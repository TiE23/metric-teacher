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
};

SubjectsList.defaultProps = {
  subjectsData: null,
};

export default SubjectsList;
