import React from "react";
import PropTypes from "prop-types";

import Subject from "./Subject";

const SubjectsList = (props) => {
  if (!props.queryData) return null;

  const { subjectSearch } = props.queryData.data;

  return (
    subjectSearch.map(subjectData => (
      <Subject
        key={subjectData.id}
        subjectData={subjectData}
        publicList={props.publicList}
      />
    ))
  );
};

SubjectsList.propTypes = {
  queryData: PropTypes.shape({
    data: PropTypes.shape({
      subjectSearch: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })).isRequired,
    }).isRequired,
  }),
  publicList: PropTypes.bool,
};

SubjectsList.defaultProps = {
  queryData: null,
  publicList: true,
};

export default SubjectsList;
