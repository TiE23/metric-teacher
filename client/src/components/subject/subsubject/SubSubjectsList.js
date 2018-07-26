import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import utils from "../../../utils";
import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_STATUS_INACTIVE,
} from "../../../constants";

import Mastery from "../../mastery/Mastery";
import MasteryAssign from "../../mastery/MasteryAssign";

const SubSubjectsList = (props) => {
  const subSubjectPanels = props.subSubjectsData.map((subSubjectData) => {
    const mastery = subSubjectData.masteries && subSubjectData.masteries.length !== 0 ?
      subSubjectData.masteries[0] : null;

    let masteryTitleString;
    if (!props.queryInfo.variables.studentid) {
      masteryTitleString = "";
    } else if (mastery && mastery.status === MASTERY_STATUS_ACTIVE) {
      masteryTitleString = "Active";
    } else if (mastery && mastery.status === MASTERY_STATUS_INACTIVE) {
      masteryTitleString = "Inactive";
    } else {
      masteryTitleString = "Unassigned";
    }

    const title = `${utils.firstLetterCap(subSubjectData.scale)}-scale - ${subSubjectData.toMetric ?
      "To Metric" : "To Imperial"}${masteryTitleString ? ` - ${masteryTitleString}` : ""}`;


    return ({
      key: subSubjectData.id,
      title,
      content: {
        content: (
          <div>
            <p>
              {subSubjectData.description}
            </p>
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
        ),
        key: subSubjectData.id,
      },
    });
  });

  return (
    <Accordion
      defaultActiveIndex={-1}
      panels={subSubjectPanels}
      styled
    />
  );
};

SubSubjectsList.propTypes = {
  subSubjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    masteries: PropTypes.array,
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
