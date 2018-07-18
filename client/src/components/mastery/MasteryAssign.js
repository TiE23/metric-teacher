import React from "react";
import PropTypes from "prop-types";

const MasteryAssign = (props) => {
  return (
    <span>----MasteryAssign</span>
  );
};

MasteryAssign.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  subSubjectId: PropTypes.string.isRequired,
};

export default MasteryAssign;
