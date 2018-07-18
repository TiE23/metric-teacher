import React from "react";
import PropTypes from "prop-types";

import Mastery from "../../mastery/Mastery";

const SubSubject = (props) => {
  const { subSubjectData } = props;
  const mastery = subSubjectData.masteries && subSubjectData.masteries.length !== 0 ?
    subSubjectData.masteries[0] : null;

  return (
    <div>
      --SubSubject: {subSubjectData.name} ({subSubjectData.id})
      {mastery &&
        <Mastery masteryData={mastery} />
      }
    </div>
  );
};

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    masteries: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  studentId: PropTypes.string,
};

SubSubject.defaultProps = {
  studentId: null,
};

export default SubSubject;
