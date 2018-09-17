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
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
} from "../../../../constants";

function ChallengeResponse(props) {
  const handleSubmit = () => {
    const { currentChallenge } = props;

    // If the question was presented as multiple choice then answerData.selectedAnswer should be 0.
    if ((currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN ||
    currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) &&
    currentChallenge.answerData && utils.t0(currentChallenge.answerData.selectedAnswer)) {
      if (currentChallenge.answerData.selectedAnswer === 0) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT);
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT);
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
        qaData={props.qaData}
        responseMode={props.currentChallenge.responseMode}
        currentChallenge={props.currentChallenge}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
      />
    </div>
  );
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentChallenge: PropTypes.shape({
    answerData: PropTypes.shape({
      selectedAnswer: PropTypes.number,
    }),
    responseMode: PropTypes.number,
  }).isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  resolveQa: PropTypes.func.isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeResponse;
