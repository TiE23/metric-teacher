import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

import MasteryAndSubSubject from "./MasteryAndSubSubject";

const MasteriesList = (props) => {
  const { masteriesData } = props;

  const masteryPanels = masteriesData.map((masteryData) => {
    const title = `${masteryData.subSubject.name} - ${(masteryData.score / MASTERY_MAX_SCORE) * 100}% Mastered - ${masteryData.status === MASTERY_STATUS_ACTIVE ? "Active" : "Inactive"}`;

    return ({
      key: masteryData.id,
      title,
      content: {
        content: (
          <MasteryAndSubSubject
            masteryData={masteryData}
            queryInfo={props.queryInfo}
            subSubjectData={masteryData.subSubject}
          />
        ),
        key: masteryData.id,
      },
    });
  });

  return (
    <Accordion
      defaultActiveIndex={props.defaultActiveIndex}
      panels={masteryPanels}
      styled
      {...props.accordionProps}
    />
  );
};

MasteriesList.propTypes = {
  masteriesData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    subSubject: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  queryInfo: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  defaultActiveIndex: PropTypes.number,
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MasteriesList.defaultProps = {
  queryInfo: null,
  defaultActiveIndex: -1,
  accordionProps: null,
};

export default MasteriesList;
