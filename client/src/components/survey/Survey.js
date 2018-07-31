import React from "react";
import PropTypes from "prop-types";
import { Segment, Progress } from "semantic-ui-react";

import SurveyToggle from "./SurveyToggle";

import {
  SURVEY_STATUS_NORMAL,
  SURVEY_MAX_SCORE,
} from "../../constants";
import utils from "../../utils";

const Survey = (props) => {
  const { surveyData } = props;

  const color = surveyData.status === SURVEY_STATUS_NORMAL ?
    utils.scoreProgressColor(surveyData.score, SURVEY_MAX_SCORE) : "grey";

  return (
    <Segment
      attached
      color={color}
    >
      <Progress
        percent={surveyData.score / (SURVEY_MAX_SCORE / 100)}
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
