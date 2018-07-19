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
        queryInfo={props.queryInfo}
        studentId={props.studentId}
      />
    ))
  );
};

SubSubjectsList.propTypes = {
  subSubjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  studentId: PropTypes.string,
};

SubSubjectsList.defaultProps = {
  studentId: null,
};

export default SubSubjectsList;
