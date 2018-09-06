import React from "react";
import PropTypes from "prop-types";
import { Divider, Grid, Segment } from "semantic-ui-react";

import ChallengeAvatar from "./ChallengeAvatar";
import ChallengeSkip from "./ChallengeSkip";
import ChallengeQuestion from "./ChallengeQuestion";

import {
  CHALLENGE_DETAILS_GRID_COLUMN_LEFT,
  CHALLENGE_DETAILS_GRID_COLUMN_RIGHT,
} from "../../../../constants";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

const ChallengeDetail = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column stretched {...CHALLENGE_DETAILS_GRID_COLUMN_LEFT}>
        <Segment>
          <ChallengeAvatar
            questionType={props.qaData.question.type}
          />
          <Divider />
          <ChallengeSkip handleSkipQa={props.handleSkipQa} />
        </Segment>
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
  handleSkipQa: PropTypes.func.isRequired,
};

export default ChallengeDetail;
