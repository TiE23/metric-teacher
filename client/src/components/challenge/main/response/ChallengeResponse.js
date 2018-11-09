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
  CHALLENGE_RESPONSE_INPUT_SLIDER,
  CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
  CHALLENGE_RESOLUTION_SURVEY_FILLED,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../../../constants";

function ChallengeResponse(props) {
  /**
   * Determines if the user's input was correct or not.
   *
   * There is a hierarchy of components and their handlers:
   * ChallengeManager.updateResultsData() - Deals with recording mastery and survey results data.
   * ChallengeList.resolveQa() - Deals with calculating mastery and survey scores.
   * ChallengeMain.resolveQa() - Deals with streaks and dimmer.
   * >ChallengeResponse.resolveQa() - Deals with determining if user's input is correct or not.
   */
  const resolveQa = () => {
    const { currentChallenge, currentQaProgress } = props;

    if ((currentQaProgress.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN ||
    currentQaProgress.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) &&
    utils.t0(currentChallenge.inputData)) {
      // Multiple choice answers should be === 0 to be correct.
      if (currentChallenge.inputData === 0) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT, { answer: `c_${currentChallenge.inputData}` });
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT, { answer: `c_${currentChallenge.inputData}` });
      }
    } else if ((currentQaProgress.responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
      currentQaProgress.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) &&
    currentChallenge.inputData) {
      // Direct and slider input answers should be within the bottom and top range values.
      const inputValue = parseFloat(currentChallenge.inputData);

      if (!Number.isNaN(inputValue) &&
      inputValue >= props.qaData.answer.data.conversion.range.bottom.value &&
      inputValue <= props.qaData.answer.data.conversion.range.top.value) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT, { answer: `i_${inputValue}` });
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT, { answer: `i_${inputValue}` });
      }
    } else if (currentQaProgress.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER) {
      // Filling out a survey is different. The inputData is an object.
      props.resolveQa(
        CHALLENGE_RESOLUTION_SURVEY_FILLED,
        {
          skip: false,
          value: currentChallenge.inputData.value,
          unit: props.qaData.question.data.survey.range.bottom.unit,
          score: 0,
          detail: currentChallenge.inputData.detail,
        },
      );
    }
  };

  const { currentChallenge, currentQaProgress, qaData } = props;
  let showSubmitButton;

  // Determine if the submit button should be shown. In the case of a Survey question being filled
  // it needs to be determined that in the case where a user note is required that it be written
  // in addition to the value. Otherwise just the value. And if not a Survey fill, just inputData.
  if (currentChallenge.inputData &&
  currentQaProgress.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_FILLER) {
    if (qaData.flags & QUESTION_FLAG_USER_DETAIL_REQUIRED) {
      // User note is required.
      showSubmitButton = !!(
        utils.t0(currentChallenge.inputData.value) &&
        (currentChallenge.inputData.detail && currentChallenge.inputData.detail.trim())
      );
    } else {
      // Not required, we only care if the value is set.
      showSubmitButton = utils.t0(currentChallenge.inputData.value);
    }
  } else {
    showSubmitButton = utils.t0(currentChallenge.inputData);
  }

  return (
    <div>
      <ChallengeMultipurposeBar
        showSubmitButton={showSubmitButton}
        challengeCompletion={props.challengeCompletion}
        resolveQa={resolveQa}
      />
      <ChallengeAnswerArea
        qaData={props.qaData}
        currentChallenge={props.currentChallenge}
        currentQaProgress={props.currentQaProgress}
        updateCurrentChallengeData={props.updateCurrentChallengeData}
        incorrectAnswers={props.currentQaProgress.incorrectAnswers}
      />
    </div>
  );
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentChallenge: PropTypes.shape({
    inputData: PropTypes.any,
  }).isRequired,
  currentQaProgress: PropTypes.shape({
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
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
