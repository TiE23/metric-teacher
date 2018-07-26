import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

import SubSubject from "../subject/subsubject/SubSubject";
import Mastery from "./Mastery";

const MasteryListItem = props => (
  <Segment>
    {props.subSubjectData &&
    <SubSubject
      subSubjectData={props.subSubjectData}
    />
    }
    <Mastery
      masteryData={props.masteryData}
      queryInfo={props.queryInfo}
    />
  </Segment>
);

MasteryListItem.propTypes = {
  masteryData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  queryInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  subSubjectData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MasteryListItem.defaultProps = {
  subSubjectData: null,
};

export default MasteryListItem;
