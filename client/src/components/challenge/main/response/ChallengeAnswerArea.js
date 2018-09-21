import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerMultipleChoice from "./multipleChoice/ChallengeAnswerMultipleChoice";
import ChallengeConversionDirect from "./conversion/ChallengeConversionDirect";
import ChallengeConversionSlider from "./conversion/ChallengeConversionSlider";
import ChallengeSurveyNoteInput from "./ChallengeSurveyNoteInput";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_RESPONSE_MULTIPLE_WRITTEN,
  CHALLENGE_RESPONSE_MULTIPLE_GENERATED,
  CHALLENGE_RESPONSE_INPUT_DIRECT,
  CHALLENGE_RESPONSE_INPUT_SLIDER,
  CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_ANSWER,
  QUESTION_FLAG_USER_DETAIL_OPTIONAL,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../../../constants";

const ChallengeAnswerArea = (props) => {
  const { currentChallenge } = props;

  if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={props.responseMode}
        choices={props.qaData.answer.data.multiple.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  } else if (props.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={props.responseMode}
        choices={props.qaData.answer.data.conversion.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentChallenge.choicesSelected}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  } else if (props.responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT) {
    return (
      <ChallengeConversionDirect
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        inputUnit={props.qaData.answer.data.unit}
        inputtedAnswer={currentChallenge.inputData}
      />
    );
  } else if (props.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
    return (
      <ChallengeConversionSlider
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        inputUnit={props.qaData.answer.data.unit}
        inputtedAnswer={currentChallenge.inputData}
        rangeMin={currentChallenge.rangeData[0]}
        rangeMax={currentChallenge.rangeData[1]}
        rangeStep={currentChallenge.rangeData[2]}
      />
    );
  } else if (props.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_ANSWER) {
    // Handle unanswered Survey questions. Its unit is based on question data.

    const showSurveyNoteInput = props.qaData.flags & (
      QUESTION_FLAG_USER_DETAIL_OPTIONAL + QUESTION_FLAG_USER_DETAIL_REQUIRED
    );

    return (
      <div>
        <ChallengeConversionSlider
          updateCurrentChallengeData={props.updateCurrentChallengeData}
          inputUnit={props.qaData.question.data.survey.range.bottom.unit}
          inputtedAnswer={currentChallenge.inputData && currentChallenge.inputData.value}
          rangeMin={currentChallenge.rangeData[0]}
          rangeMax={currentChallenge.rangeData[1]}
          rangeStep={currentChallenge.rangeData[2]}
          surveyAnswerMode
        />
        {!!showSurveyNoteInput &&
          <ChallengeSurveyNoteInput
            updateCurrentChallengeData={props.updateCurrentChallengeData}
            noteRequired={!!(props.qaData.flags & QUESTION_FLAG_USER_DETAIL_REQUIRED)}
            surveyNote={currentChallenge.inputData && currentChallenge.inputData.detail}
            placeholder="Write your note here..."
          />
        }
      </div>
    );
  }

  return (
    <p>Unknown mode. Please skip this question.</p>
  );
};

ChallengeAnswerArea.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  responseMode: PropTypes.number.isRequired,
  currentChallenge: PropTypes.shape({
    inputData: PropTypes.any, // Won't be set at the beginning.
    choicesSelected: PropTypes.arrayOf(PropTypes.number), // Isn't set for unanswered surveys.
    rangeData: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeAnswerArea;
