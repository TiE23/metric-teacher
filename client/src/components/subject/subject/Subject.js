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
        publicList={props.publicList}
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
  publicList: PropTypes.bool,
};

Subject.defaultProps = {
  publicList: false,
};

export default Subject;
