import React from "react";
import PropTypes from "prop-types";

const SubSubject = props =>  (
  <div>
    <b>SubSubject</b>: {props.subSubjectData.name} ({props.subSubjectData.id})
  </div>
);

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    masteries: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default SubSubject;
