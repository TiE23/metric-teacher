import React from "react";
import PropTypes from "prop-types";

import Survey from "./Survey";

const SurveyAndQuestion = props => (
  <div>
    {props.questionData &&
      <p>Question ID: {props.questionData.id}</p>
    }
    {props.opened && <p>Opened!</p>}
    {props.surveyData &&
    <Survey
      surveyData={props.surveyData}
      queryInfo={props.queryInfo}
    />
    }
  </div>
);

SurveyAndQuestion.propTypes = {
  questionData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  surveyData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  queryInfo: PropTypes.shape({
    variables: PropTypes.shape({
      studentid: PropTypes.string,
      userid: PropTypes.string,
    }).isRequired,
  }),
  opened: PropTypes.any,
};

SurveyAndQuestion.defaultProps = {
  questionData: null,
  surveyData: null,
  queryInfo: null,
  opened: false,
};

export default SurveyAndQuestion;
