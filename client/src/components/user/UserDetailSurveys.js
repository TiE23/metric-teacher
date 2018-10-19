import React from "react";
import PropTypes from "prop-types";

import SurveysList from "../survey/SurveysList";

const UserDetailSurveys = (props) => {
  if (props.surveys.length) {
    return (
      <SurveysList
        surveysData={props.surveys}
        queryInfo={props.queryInfo}
        accordionProps={{ fluid: true }}
      />
    );
  } else {
    return (
      <p>No surveys!</p>
    );
  }
};

UserDetailSurveys.propTypes = {
  surveys: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  queryInfo: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
};

export default UserDetailSurveys;
