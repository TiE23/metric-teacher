import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import utils from "../../utils";
import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_STATUS_INACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

import MasteryAndSubSubject from "../mastery/MasteryAndSubSubject";

const SubSubjectsList = (props) => {
  const subSubjectPanels = props.subSubjectsData.map((subSubjectData) => {
    const masteryData = subSubjectData.masteries && subSubjectData.masteries.length !== 0 ?
      subSubjectData.masteries[0] : null;

    let masteryTitleString;

    if (!props.queryInfo ||
      !(props.queryInfo.variables.studentid || props.queryInfo.variables.userid)) {
      masteryTitleString = "";
    } else if (masteryData && masteryData.status === MASTERY_STATUS_ACTIVE) {
      masteryTitleString = `${masteryData.score / (MASTERY_MAX_SCORE / 100)}% Mastered - Active`;
    } else if (masteryData && masteryData.status === MASTERY_STATUS_INACTIVE) {
      masteryTitleString = `${masteryData.score / (MASTERY_MAX_SCORE / 100)}% Mastered - Inactive`;
    } else {
      masteryTitleString = "Not Assigned";
    }

    const title = `${utils.firstLetterCap(subSubjectData.scale)}-scale - ${subSubjectData.toMetric ?
      "To Metric" : "From Metric"}${masteryTitleString ? ` - ${masteryTitleString}` : ""}`;

    return ({
      key: subSubjectData.id,
      title,
      content: {
        content: (
          <MasteryAndSubSubject
            subSubjectData={subSubjectData}
            masteryData={masteryData}
            queryInfo={props.queryInfo}
          />
        ),
        key: subSubjectData.id,
      },
    });
  });

  return (
    <Accordion
      panels={subSubjectPanels}
      styled
      {...props.accordionProps}
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
      userid: PropTypes.string,
    }),
  }),
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SubSubjectsList.defaultProps = {
  queryInfo: null,
  accordionProps: null,
};

export default SubSubjectsList;
