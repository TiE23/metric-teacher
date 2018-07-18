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
        publicList={props.publicList}
      />
    ))
  );
};

SubjectsList.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  publicList: PropTypes.bool,
};

SubjectsList.defaultProps = {
  subjectsData: null,
  query: null,
  publicList: true,
};

export default SubjectsList;
