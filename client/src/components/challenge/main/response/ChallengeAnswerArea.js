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
        updateCurrentQaData={props.updateCurrentQaData}
        selectedAnswer={
          props.currentQa.answerData && props.currentQa.answerData.selectedAnswer
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
  currentQa: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  updateCurrentQaData: PropTypes.func.isRequired,
};

export default ChallengeAnswerArea;
