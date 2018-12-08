import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid } from "semantic-ui-react";

import ChallengeAvatar from "./ChallengeAvatar";
import ChallengeSkip from "./ChallengeSkip";
import ChallengeQuestion from "./ChallengeQuestion";

import {
  CHALLENGE_DETAILS_GRID_COLUMN_LEFT,
  CHALLENGE_DETAILS_GRID_COLUMN_RIGHT,
  CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER,
} from "../../../../constants";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

const ChallengeDetail = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column {...CHALLENGE_DETAILS_GRID_COLUMN_LEFT}>
        <ChallengeAvatar
          questionType={props.qaData.question.type}
        />
        <Divider />
        <ChallengeSkip
          showClearButton={props.showClearButton}
          showSurveySkipConfirm={props.responseMode ===
            CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER}
          handleSkipQa={props.handleSkipQa}
          handleAnswerQaLater={props.handleAnswerQaLater}
          handleClearQa={props.handleClearQa}
        />
      </Grid.Column>
      <Grid.Column stretched {...CHALLENGE_DETAILS_GRID_COLUMN_RIGHT}>
        <ChallengeQuestion
          qaData={props.qaData}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

ChallengeDetail.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  showClearButton: PropTypes.bool.isRequired,
  responseMode: PropTypes.number.isRequired,
  handleSkipQa: PropTypes.func.isRequired,
  handleAnswerQaLater: PropTypes.func.isRequired,
  handleClearQa: PropTypes.func.isRequired,
};

export default ChallengeDetail;
