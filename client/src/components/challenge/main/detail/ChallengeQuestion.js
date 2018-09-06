import React from "react";
import { Segment } from "semantic-ui-react";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import QaReviewBasics from "../../../qa/QaReviewBasics";

const ChallengeQuestion = props => (
  <Segment>
    {/* Temporary stand-in */}
    <QaReviewBasics qaData={props.qaData} />
  </Segment>
);

ChallengeQuestion.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default ChallengeQuestion;
