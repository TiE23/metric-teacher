import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

import MasteryListItem from "./MasteryListItem";

const MasteriesList = (props) => {
  const { masteriesData } = props;

  const masteryPanels = masteriesData.map((masteryData) => {
    const title = `${masteryData.subSubject.name} - ${(masteryData.score / MASTERY_MAX_SCORE) * 100}% Mastered - ${masteryData.status === MASTERY_STATUS_ACTIVE ? "Active" : "Inactive"}`;

    return ({
      key: masteryData.id,
      title,
      content: {
        content: (
          <MasteryListItem
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
      defaultActiveIndex={-1}
      panels={masteryPanels}
      styled
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
};

MasteriesList.defaultProps = {
  queryInfo: null,
};

export default MasteriesList;
