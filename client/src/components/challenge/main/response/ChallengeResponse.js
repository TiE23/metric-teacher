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

  const handleSubmit = () => {
    // If the question was presented as multiple choice, then answerData
    if (type === "multiplechoice" && props.currentChallenge.answerData &&
    utils.t0(props.currentChallenge.answerData.selectedAnswer)) {
      if (props.currentChallenge.answerData.selectedAnswer === 0) {
        props.resolveCurrentQA(props.qaData.id, "correct");
      } else {
        props.resolveCurrentQA(props.qaData.id, "incorrect");
      }
    }
  };

  return (
    <div>
      <ChallengeMultipurposeBar
        showSubmitButton={
          !!(props.currentChallenge.answerData &&
          utils.t0(props.currentChallenge.answerData.selectedAnswer))
        }
        challengeCompletion={props.challengeCompletion}
        handleSubmit={handleSubmit}
      />
      <ChallengeAnswerArea
        type={type}
        qaData={props.qaData}
        currentChallenge={props.currentChallenge}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
      />
    </div>
  );
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentChallenge: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  resolveCurrentQA: PropTypes.func.isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeResponse;
