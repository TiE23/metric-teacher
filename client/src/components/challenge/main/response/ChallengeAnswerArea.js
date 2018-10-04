import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerMultipleChoice from "./multipleChoice/ChallengeAnswerMultipleChoice";
import ChallengeAnswerConversionDirect from "./conversion/ChallengeAnswerConversionDirect";
import ChallengeAnswerConversionSlider from "./conversion/ChallengeAnswerConversionSlider";
import ChallengeSurveyNoteInput from "./ChallengeSurveyNoteInput";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  CHALLENGE_RESPONSE_MULTIPLE_WRITTEN,
  CHALLENGE_RESPONSE_MULTIPLE_GENERATED,
  CHALLENGE_RESPONSE_INPUT_DIRECT,
  CHALLENGE_RESPONSE_INPUT_SLIDER,
  CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER,
  QUESTION_FLAG_USER_DETAIL_OPTIONAL,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../../../constants";

const ChallengeAnswerArea = (props) => {
  const { currentChallenge, currentQaProgress } = props;
  const { responseMode } = props.currentQaProgress;

  if (responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={responseMode}
        choices={props.qaData.answer.data.multiple.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentQaProgress.choicesSelected}
        incorrectAnswers={props.incorrectAnswers}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  } else if (responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) {
    return (
      <ChallengeAnswerMultipleChoice
        mode={responseMode}
        choices={props.qaData.answer.data.conversion.choices}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        choicesSelected={currentQaProgress.choicesSelected}
        incorrectAnswers={props.incorrectAnswers}
        selectedAnswer={currentChallenge.inputData}
      />
    );
  } else if (responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT) {
    return (
      <ChallengeAnswerConversionDirect
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        inputUnit={props.qaData.answer.data.unit}
        inputtedAnswer={currentChallenge.inputData}
      />
    );
  } else if (responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
    return (
      <ChallengeAnswerConversionSlider
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        inputUnit={props.qaData.answer.data.unit}
        inputtedAnswer={currentChallenge.inputData}
        rangeMin={currentQaProgress.rangeData[0]}
        rangeMax={currentQaProgress.rangeData[1]}
        rangeStep={currentQaProgress.rangeData[2]}
      />
    );
  } else if (responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER) {
    // Handle unfilled Survey questions. Its unit is based on question data.
    const showSurveyNoteInput = props.qaData.flags & (
      QUESTION_FLAG_USER_DETAIL_OPTIONAL + QUESTION_FLAG_USER_DETAIL_REQUIRED
    );

    return (
      <div>
        <ChallengeAnswerConversionSlider
          updateCurrentChallengeData={props.updateCurrentChallengeData}
          inputUnit={props.qaData.question.data.survey.range.bottom.unit}
          inputtedAnswer={currentChallenge.inputData && currentChallenge.inputData.value}
          rangeMin={currentQaProgress.rangeData[0]}
          rangeMax={currentQaProgress.rangeData[1]}
          rangeStep={currentQaProgress.rangeData[2]}
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
  currentChallenge: PropTypes.shape({
    inputData: PropTypes.any, // Won't be set at the beginning.
  }).isRequired,
  currentQaProgress: PropTypes.shape({
    choicesSelected: PropTypes.arrayOf(PropTypes.number), // Isn't set for unanswered surveys.
    rangeData: PropTypes.arrayOf(PropTypes.number),
    responseMode: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ChallengeAnswerArea;
