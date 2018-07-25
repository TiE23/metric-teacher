import React from "react";
import PropTypes from "prop-types";

import SubSubject from "./SubSubject";
import Mastery from "../../mastery/Mastery";
import MasteryAssign from "../../mastery/MasteryAssign";

const SubSubjectsList = (props) => {
  const { subSubjectsData } = props;

  return (
    subSubjectsData.map((subSubjectData) => {
      const mastery = subSubjectData.masteries && subSubjectData.masteries.length !== 0 ?
        subSubjectData.masteries[0] : null;

      return (
        <div key={subSubjectData.id}>
          <SubSubject
            subSubjectData={subSubjectData}
            studentId={props.studentId}
          />
          {mastery &&
            <Mastery
              queryInfo={props.queryInfo}
              masteryData={mastery}
            />
          }
          {!mastery && props.queryInfo && props.queryInfo.variables.studentid &&
            <MasteryAssign
              queryInfo={props.queryInfo}
              subSubjectId={subSubjectData.id}
              studentId={props.queryInfo.variables.studentid}
            />
          }
        </div>
      );
    })
  );
};

SubSubjectsList.propTypes = {
  subSubjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.shape({
      studentid: PropTypes.string,
    }),
  }),
};

SubSubjectsList.defaultProps = {
  queryInfo: null,
};

export default SubSubjectsList;
