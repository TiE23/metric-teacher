import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerMultipleChoice from "./multipleChoice/ChallengeAnswerMultipleChoice";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_RESPONSE_MULTIPLE_GENERATED,
  CHALLENGE_RESPONSE_MULTIPLE_WRITTEN,
} from "../../../../constants";

const ChallengeAnswerArea = (props) => {
  if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN) {
    const { currentChallenge } = props;

    return (
      <ChallengeAnswerMultipleChoice
        mode={CHALLENGE_RESPONSE_MULTIPLE_WRITTEN}
        choices={props.qaData.answer.data.multiple.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={
          currentChallenge.answerData && currentChallenge.answerData.selectedAnswer
        }
      />
    );
  }

  if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) {
    const { currentChallenge } = props;

    // TODO - choices={props.qaData.answer.data.survey.choices} option
    return (
      <ChallengeAnswerMultipleChoice
        mode={CHALLENGE_RESPONSE_MULTIPLE_GENERATED}
        choices={props.qaData.answer.data.conversion.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={
          currentChallenge.answerData && currentChallenge.answerData.selectedAnswer
        }
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
    answerData: PropTypes.shape({
      selectedAnswer: PropTypes.number,
    }), // Won't be set at the beginning.
    choicesSelected: PropTypes.arrayOf(PropTypes.number), // Isn't set for unanswered surveys.
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeAnswerArea;
