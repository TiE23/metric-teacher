import React from "react";
import PropTypes from "prop-types";
import { Segment, Grid } from "semantic-ui-react";

import ChallengeDetail from "./detail/ChallengeDetail";
import ChallengeResponse from "./response/ChallengeResponse";

import {
  QA_DATA_EVERYTHING,
} from "../../../propTypes";

const ChallengeMain = (props) => {
  const handleSkipQa = () => props.resolveCurrentQA("skip");

  return (
    <Grid as={Segment}>
      <Grid.Row>
        <Grid.Column>
          <ChallengeDetail
            qaData={props.qaData}
            handleSkipQa={handleSkipQa}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ChallengeResponse
            qaData={props.qaData}
            challengeProgress={props.challengeProgress}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ChallengeMain.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQaProgress: PropTypes.shape({
    seen: PropTypes.bool.isRequired,
    skipped: PropTypes.bool.isRequired,
    correctlyAnswered: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
    incorrectAnswerCount: PropTypes.number.isRequired,
  }).isRequired,
  resolveCurrentQA: PropTypes.func.isRequired,
  challengeProgress: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeMain;
