import React from "react";
import { Segment } from "semantic-ui-react";

import QaReviewBasics from "../../../qa/QaReviewBasics";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";


// TODO - Need to handle difference between answered and unanswered Survey questions.
const ChallengeQuestion = props => (
  <Segment>
    <QaReviewBasics
      qaData={props.qaData}
      challengeMode
    />
  </Segment>
);

ChallengeQuestion.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default ChallengeQuestion;
