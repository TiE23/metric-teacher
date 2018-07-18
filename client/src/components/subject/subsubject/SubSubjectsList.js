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
        publicList={props.publicList}
      />
    ))
  );
};

SubSubjectsList.propTypes = {
  subSubjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  publicList: PropTypes.bool,
};

SubSubjectsList.defaultProps = {
  publicList: true,
};

export default SubSubjectsList;
