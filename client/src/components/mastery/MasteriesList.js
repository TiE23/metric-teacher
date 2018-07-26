import React from "react";
import PropTypes from "prop-types";

import { Accordion } from "semantic-ui-react";

import Mastery from "./Mastery";
import SubSubject from "../subject/subsubject/SubSubject";

const MasteriesList = (props) => {
  const { masteriesData } = props;

  const masteryPanels = masteriesData.map(masteryData => ({
    key: masteryData.id,
    title: masteryData.subSubject.name,
    content: { content: (
      <div>
        <Mastery
          masteryData={masteryData}
          queryInfo={props.queryInfo}
        />
        {masteryData.subSubject &&
        <SubSubject
          subSubjectData={masteryData.subSubject}
        />
        }
      </div>
    ) },
  }));

  return (
    <Accordion
      defaultActiveIndex={-1}
      panels={masteryPanels}
      styled
    />
  );
};

MasteriesList.propTypes = {
  masteriesData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subSubject: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  queryInfo: PropTypes.object,
};

export default MasteriesList;
