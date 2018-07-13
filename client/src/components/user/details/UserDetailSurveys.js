import React from "react";
import PropTypes from "prop-types";

import UserDetailSurvey from "./UserDetailSurvey";

const UserDetailSurveys = (props) => {
  if (props.surveys.length) {
    return (
      <div>
        <ul>
          {props.surveys.map(survey => (
            <UserDetailSurvey key={survey.id} survey={survey} />
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <p>No surveys!</p>
      </div>
    );
  }
};

UserDetailSurveys.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default UserDetailSurveys;
