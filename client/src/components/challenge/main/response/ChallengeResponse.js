import React from "react";
import PropTypes from "prop-types";

import utils from "../../../../utils";

import ChallengeMultipurposeBar from "./ChallengeMultipurposeBar";
import ChallengeAnswerArea from "./ChallengeAnswerArea";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  QUESTION_TYPE_WRITTEN,
} from "../../../../constants";

function ChallengeResponse(props) {
  const type =
    props.qaData.question.type === QUESTION_TYPE_WRITTEN ? "multiplechoice" : "foo";

  return (
    <div>
      <ChallengeMultipurposeBar
        showSubmitButton={
          !!(props.currentQa.answerData && utils.t0(props.currentQa.answerData.selectedAnswer))
        }
        challengeCompletion={props.challengeCompletion}
      />
      <ChallengeAnswerArea
        type={type}
        qaData={props.qaData}
        currentQa={props.currentQa}
        updateCurrentQaData={props.updateCurrentQaData}
      />
    </div>
  );
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQa: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentQaData: PropTypes.func.isRequired,
};

export default ChallengeResponse;
