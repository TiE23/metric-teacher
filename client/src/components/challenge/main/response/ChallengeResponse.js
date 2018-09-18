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
  CHALLENGE_RESPONSE_INPUT_DIRECT,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
} from "../../../../constants";

function ChallengeResponse(props) {
  const handleSubmit = () => {
    const { currentChallenge } = props;

    // If the question was presented as multiple choice then inputData should be 0.
    if ((currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN ||
    currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) &&
    utils.t0(currentChallenge.inputData)) {
      if (currentChallenge.inputData === 0) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT);
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT);
      }
    } else if (currentChallenge.responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT &&
    currentChallenge.inputData) {
      const inputValue = parseInt(currentChallenge.inputData, 10);
      if (!Number.isNaN(inputValue) &&
      inputValue >= props.qaData.answer.data.conversion.range.bottom.value &&
      inputValue <= props.qaData.answer.data.conversion.range.top.value) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT);
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT);
      }
    }
  };

  return (
    <div>
      <ChallengeMultipurposeBar
        showSubmitButton={utils.t0(props.currentChallenge.inputData)}
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
    inputData: PropTypes.any,
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
