import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";
import sortBy from "lodash/sortBy";
import deline from "deline";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

import MasteryAndSubSubject from "./MasteryAndSubSubject";

const MasteriesList = (props) => {
  const { masteriesData } = props;

  const masteryPanels = sortBy(masteriesData, "subSubject.id").map(masteryData => (
    {
      key: masteryData.id,
      title: deline`
        ${masteryData.subSubject.name} -
        ${masteryData.score / (MASTERY_MAX_SCORE / 100)}% Mastered -
        ${masteryData.status === MASTERY_STATUS_ACTIVE ? "Active" : "Inactive"}
      `,
      content: {
        key: masteryData.id,
        content: (
          <MasteryAndSubSubject
            masteryData={masteryData}
            queryInfo={props.queryInfo}
            subSubjectData={masteryData.subSubject}
          />
        ),
      },
    }
  ));

  return (
    <Accordion
      panels={masteryPanels}
      styled
      {...props.accordionProps}
    />
  );
};

MasteriesList.propTypes = {
  masteriesData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    subSubject: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  queryInfo: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MasteriesList.defaultProps = {
  queryInfo: null,
  accordionProps: null,
};

export default MasteriesList;
