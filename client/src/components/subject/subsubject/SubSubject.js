import React from "react";
import PropTypes from "prop-types";

const SubSubject = (props) => {
  const { subSubjectData } = props;

  return (
    <div>--SubSubject: {subSubjectData.name} ({subSubjectData.id})</div>
  );
};

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  publicList: PropTypes.bool,
};

SubSubject.defaultProps = {
  publicList: true,
};

export default SubSubject;
