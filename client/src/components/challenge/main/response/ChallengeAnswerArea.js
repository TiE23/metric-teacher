import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerMultipleChoice from "./multipleChoice/ChallengeAnswerMultipleChoice";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_ANSWER_MODE_WRITTEN,
} from "../../../../constants";

const ChallengeAnswerArea = (props) => {
  if (props.type === "multiplechoice") {
    const { multiple } = props.qaData.answer.data;

    return (
      <ChallengeAnswerMultipleChoice
        mode={CHALLENGE_ANSWER_MODE_WRITTEN}
        choicesOffered={multiple.choicesOffered}
        choices={multiple.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={props.currentChallenge.choicesSelected}
        selectedAnswer={
          props.currentChallenge.answerData && props.currentChallenge.answerData.selectedAnswer
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
  type: PropTypes.string.isRequired,
  currentChallenge: PropTypes.shape({
    answerData: PropTypes.shape({
      selectedAnswer: PropTypes.number,
    }), // Won't be set at the beginning.
    choicesSelected: PropTypes.arrayOf(PropTypes.number), // Isn't set for unanswered surveys.
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeAnswerArea;
