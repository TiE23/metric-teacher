import React from "react";
import PropTypes from "prop-types";

import SubSubject from "./SubSubject";

const SubSubjectsList = (props) => {
  const { subSubjectsData } = props;

  return (
    subSubjectsData.map(subSubjectData => (
      <SubSubject
        key={subSubjectData.id}
        subSubjectData={subSubjectData}
        query={props.query}
        studentId={props.studentId}
      />
    ))
  );
};

SubSubjectsList.propTypes = {
  subSubjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string,
};

SubSubjectsList.defaultProps = {
  studentId: null,
};

export default SubSubjectsList;
