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
  CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_ANSWER,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
  CHALLENGE_RESOLUTION_SURVEY_ANSWER,
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
    const { currentChallenge } = props;

    if ((currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_WRITTEN ||
    currentChallenge.responseMode === CHALLENGE_RESPONSE_MULTIPLE_GENERATED) &&
    utils.t0(currentChallenge.inputData)) {
      // Multiple choice answers should be === 0 to be correct.
      if (currentChallenge.inputData === 0) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT);
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT);
      }
    } else if ((currentChallenge.responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
      currentChallenge.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) &&
    currentChallenge.inputData) {
      // Direct and slider input answers should be within the bottom and top range values.
      const inputValue = parseFloat(currentChallenge.inputData);

      if (!Number.isNaN(inputValue) &&
      inputValue >= props.qaData.answer.data.conversion.range.bottom.value &&
      inputValue <= props.qaData.answer.data.conversion.range.top.value) {
        props.resolveQa(CHALLENGE_RESOLUTION_CORRECT, { answer: inputValue });
      } else {
        props.resolveQa(CHALLENGE_RESOLUTION_INCORRECT, { answer: inputValue });
      }
    } else if (currentChallenge.responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER_SURVEY_ANSWER) {
      // Filling out a survey is different. The inputData is an object.
      props.resolveQa(
        CHALLENGE_RESOLUTION_SURVEY_ANSWER,
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

  // TODO - For Survey Answers:
  // Block submitButton if no note when required.
  // Block submitButton if no input when there is a note
  const showSubmitButton = utils.t0(props.currentChallenge.inputData);

  return (
    <div>
      <ChallengeMultipurposeBar
        showSubmitButton={showSubmitButton}
        challengeCompletion={props.challengeCompletion}
        resolveQa={resolveQa}
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
