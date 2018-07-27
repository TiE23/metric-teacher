import React from "react";
import PropTypes from "prop-types";
import { Segment, Progress } from "semantic-ui-react";

import SurveyToggle from "./SurveyToggle";

import {
  SURVEY_STATUS_NORMAL,
  SURVEY_MAX_SCORE,
} from "../../constants";

const Survey = (props) => {
  const { surveyData } = props;

  const surveyQuarters = SURVEY_MAX_SCORE / 4;
  let surveyColor;

  if (surveyData.score < surveyQuarters) surveyColor = "red";
  else if (surveyData.score < surveyQuarters * 2) surveyColor = "orange";
  else if (surveyData.score < surveyQuarters * 3) surveyColor = "yellow";
  else if (surveyData.score < surveyQuarters * 4) surveyColor = "olive";
  else surveyColor = "green";

  const color = surveyData.status === SURVEY_STATUS_NORMAL ? surveyColor : "grey";

  return (
    <Segment
      attached
      color={color}
    >
      <Progress
        progress="percent"
        value={surveyData.score}
        total={SURVEY_MAX_SCORE}
        color={color}
        active={surveyData.status === SURVEY_STATUS_NORMAL}
      >
        Survey {surveyData.score}/{SURVEY_MAX_SCORE}
      </Progress>
      {props.queryInfo &&
        <SurveyToggle
          queryInfo={props.queryInfo}
          surveyId={surveyData.id}
          surveyCurrentStatus={surveyData.status}
          buttonProps={{
            fluid: true,
          }}
        />
      }
    </Segment>
  );
};

Survey.propTypes = {
  surveyData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
};

Survey.defaultProps = {
  queryInfo: null,
};

export default Survey;
