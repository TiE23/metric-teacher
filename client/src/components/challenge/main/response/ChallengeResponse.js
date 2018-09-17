import React from "react";
import PropTypes from "prop-types";

import utils from "../../../../utils";

import ChallengeMultipurposeBar from "./ChallengeMultipurposeBar";
import ChallengeAnswerArea from "./ChallengeAnswerArea";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_RESPONSE_MULTIPLE_WRITTEN,
  CHALLENGE_RESPONSE_MULTIPLE_GENERATED,
  QUESTION_TYPE_WRITTEN,
} from "../../../../constants";

function ChallengeResponse(props) {
  let responseType;
  if (props.qaData.question.type === QUESTION_TYPE_WRITTEN) {
    responseType = CHALLENGE_RESPONSE_MULTIPLE_WRITTEN;
  } else {
    responseType = -1;
  }

  const handleSubmit = () => {
    // If the question was presented as multiple choice then answerData.selectedAnswer should be 0.
    if ((responseType === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN ||
    responseType === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) && props.currentChallenge.answerData &&
    utils.t0(props.currentChallenge.answerData.selectedAnswer)) {
      if (props.currentChallenge.answerData.selectedAnswer === 0) {
        props.resolveQa("correct");
      } else {
        props.resolveQa("incorrect");
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
        responseType={responseType}
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
  resolveQa: PropTypes.func.isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeResponse;
