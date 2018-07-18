import React from "react";
import PropTypes from "prop-types";

const SubSubject = (props) => {
  const { subSubjectData } = props;
  const mastery = subSubjectData.masteries && subSubjectData.masteries.length !== 0 ?
    subSubjectData.masteries[0] : null;

  return (
    <div>
      --SubSubject: {subSubjectData.name} ({subSubjectData.id})
      {mastery &&
        <span>----Mastery - Status: {mastery.status} - Score: {mastery.score} </span>
      }
    </div>
  );
};

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    masteries: PropTypes.arrayOf(PropTypes.shape({
      status: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
    })),
  }).isRequired,
  publicList: PropTypes.bool,
};

SubSubject.defaultProps = {
  publicList: true,
};

export default SubSubject;
