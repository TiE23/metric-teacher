import React from "react";
import { Segment } from "semantic-ui-react";

import utils from "../../../../utils";

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
    <br />
    <div style={{ position: "absolute", bottom: 5, right: 5 }}>
      <span style={{ color: "grey" }}>
        {props.qaData.subject.name}
        {" - "}
        {utils.firstLetterCap(props.qaData.subject.scale)}
        {" - "}
        {props.qaData.subject.toMetric ? "To Metric" : "From Metric"}
      </span>
    </div>
  </Segment>
);

ChallengeQuestion.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default ChallengeQuestion;
