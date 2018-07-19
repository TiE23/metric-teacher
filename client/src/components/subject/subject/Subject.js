import React from "react";
import PropTypes from "prop-types";

import SubSubjectsList from "../subsubject/SubSubjectsList";

const Subject = (props) => {
  const { subjectData } = props;

  return (
    <div>Subject: {subjectData.name} ({subjectData.id})
      <br />
      <SubSubjectsList
        subSubjectsData={subjectData.subSubjects}
        queryInfo={props.queryInfo}
        studentId={props.studentId}
      />
    </div>
  );
};

Subject.propTypes = {
  subjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  studentId: PropTypes.string,
};

Subject.defaultProps = {
  studentId: null,
};

export default Subject;
