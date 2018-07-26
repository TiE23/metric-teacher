import React from "react";
import PropTypes from "prop-types";

import SubSubjectsList from "../subsubject/SubSubjectsList";

const Subject = (props) => {
  const { subjectData } = props;

  return (
    <div>
      <p>
        {subjectData.description}
      </p>
      <SubSubjectsList
        subSubjectsData={subjectData.subSubjects}
        queryInfo={props.queryInfo}
      />
    </div>
  );
};

Subject.propTypes = {
  subjectData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default Subject;
