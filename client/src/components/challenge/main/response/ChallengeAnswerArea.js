import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerMultipleChoice from "./multipleChoice/ChallengeAnswerMultipleChoice";
import ChallengeConversionDirect from "./conversion/ChallengeConversionDirect";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_RESPONSE_INPUT_DIRECT,
  CHALLENGE_RESPONSE_MULTIPLE_GENERATED,
  CHALLENGE_RESPONSE_MULTIPLE_WRITTEN,
} from "../../../../constants";

const ChallengeAnswerArea = (props) => {
  const { currentChallenge } = props;

  if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={CHALLENGE_RESPONSE_MULTIPLE_WRITTEN}
        choices={props.qaData.answer.data.multiple.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  }

  if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={CHALLENGE_RESPONSE_MULTIPLE_GENERATED}
        choices={props.qaData.answer.data.conversion.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  }

  if (props.responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT) {
    return (
      <ChallengeConversionDirect
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        inputUnit={props.qaData.answer.data.unit}
        inputtedAnswer={currentChallenge.inputData}
      />
    );
  }

  return (
    <p>None</p>
  );
};

ChallengeAnswerArea.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  responseMode: PropTypes.number.isRequired,
  currentChallenge: PropTypes.shape({
    inputData: PropTypes.any, // Won't be set at the beginning.
    choicesSelected: PropTypes.arrayOf(PropTypes.number), // Isn't set for unanswered surveys.
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeAnswerArea;
