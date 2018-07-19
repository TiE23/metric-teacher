import React from "react";
import PropTypes from "prop-types";

import Mastery from "../../mastery/Mastery";
import MasteryAssign from "../../mastery/MasteryAssign";

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
      {!mastery && props.studentId &&
        <MasteryAssign
          queryInfo={props.queryInfo}
          subSubjectId={subSubjectData.id}
          studentId={props.studentId}
        />
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
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  studentId: PropTypes.string,
};

SubSubject.defaultProps = {
  studentId: null,
};

export default SubSubject;
