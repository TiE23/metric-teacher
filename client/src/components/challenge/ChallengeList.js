import React from "react";
import PropTypes from "prop-types";
import { Transition } from "semantic-ui-react";

import ChallengeMain from "./main/ChallengeMain";
import ChallengeComplete from "./extra/ChallengeComplete";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  CHALLENGE_TRANSITION_PROPS,
  CHALLENGE_SCORES,
  CHALLENGE_MAX_STRIKES,
  CHALLENGE_QUESTION_REPEAT,
  CHALLENGE_RESULTS_MASTERY_SCORE,
  CHALLENGE_RESULTS_SURVEY_SCORE,
  CHALLENGE_RESULTS_SURVEY_ANSWER,
  QUESTION_TYPE_SURVEY,
  CHALLENGE_RESOLUTION_SKIP,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
  CHALLENGE_RESOLUTION_SURVEY_ANSWER,
} from "../../constants";

const ChallengeList = (props) => {
  /**
   *
   * @param qaId - The QA id
   * @param resolution - Skip, correct, incorrect, or survey answered
   * @param surveyPayload - for "survey-answered", contains the data for the SurveyAnswerInput:
   *                    { skip, value, unit, score, detail }
   */
  const resolveCurrentQA = (qaId, resolution, surveyPayload = null) => {
    // TODO - Remove this when done.
    console.log(resolution, qaId, surveyPayload);
    const challengeProgressUpdate = { seen: true };
    const currentQaObject =
      utils.cacheGetTarget(props.challengeData, props.currentChallenge.currentQaId);

    // Different resolutions getting handled.
    if (resolution === CHALLENGE_RESOLUTION_SKIP) {
      challengeProgressUpdate.skipped = true;

      // Only score adjust if skipped on first view (seen === true).
      if (!props.challengeProgress[currentQaObject.id].seen) {
        // Punish student's mastery for skipping.
        props.updateResultsData(
          CHALLENGE_RESULTS_MASTERY_SCORE,
          currentQaObject.subSubjectId,
          {
            score: CHALLENGE_SCORES.skipped.mastery[
              currentQaObject.question.type
            ][currentQaObject.difficulty],
          },
        );

        // Punish student's survey score for skipping.
        if (currentQaObject.question.type === QUESTION_TYPE_SURVEY &&
        currentQaObject.question.data.survey.response) {
          props.updateResultsData(
            CHALLENGE_RESULTS_SURVEY_SCORE,
            currentQaObject.question.data.survey.response.surveyId,
            { score: CHALLENGE_SCORES.skipped.survey[currentQaObject.difficulty] },
          );
        }
      }
    } else if (resolution === CHALLENGE_RESOLUTION_CORRECT) {
      // Check the question repeat setting. Only mark as "succeeded" when the question has been
      // answered correctly enough times.
      if (props.challengeProgress[currentQaObject.id].correctAnswerCount + 1 >=
      CHALLENGE_QUESTION_REPEAT[currentQaObject.question.type][currentQaObject.difficulty]) {
        challengeProgressUpdate.succeeded = true;
      }
      challengeProgressUpdate.correctAnswerCount = 1;

      // Award mastery score for a correct answer.
      props.updateResultsData(
        CHALLENGE_RESULTS_MASTERY_SCORE,
        currentQaObject.subSubjectId,
        {
          score: Math.ceil(CHALLENGE_SCORES.correct.mastery[
            currentQaObject.question.type
          ][currentQaObject.difficulty] / // Each successive correct answer decreases score.
          props.challengeProgress[currentQaObject.id].correctAnswerCount + 1),
        },
        // 1st answer: 100% score. 2nd: 50% score. 3rd: 33% score. etc...
        // Score is rounded up, so always worth at least 1 point.
      );

      // Award survey score for a correct answer.
      if (currentQaObject.question.type === QUESTION_TYPE_SURVEY) {
        props.updateResultsData(
          CHALLENGE_RESULTS_SURVEY_SCORE,
          currentQaObject.question.data.survey.response.surveyId,
          { score: CHALLENGE_SCORES.correct.survey[currentQaObject.difficulty] },
        );
      }
    } else if (resolution === CHALLENGE_RESOLUTION_INCORRECT) {
      // Check the strike allowance. Too many strikes? Mark as failed.
      if (props.challengeProgress[currentQaObject.id].incorrectAnswerCount + 1 >=
      CHALLENGE_MAX_STRIKES[currentQaObject.question.type][currentQaObject.difficulty]) {
        challengeProgressUpdate.failed = true;
      }
      challengeProgressUpdate.incorrectAnswerCount = 1;

      // Punish mastery score for an incorrect answer.
      props.updateResultsData(
        CHALLENGE_RESULTS_MASTERY_SCORE,
        currentQaObject.subSubjectId,
        {
          score: CHALLENGE_SCORES.incorrect.mastery[
            currentQaObject.question.type
          ][currentQaObject.difficulty],
        },
      );

      // Punish survey score for an incorrect answer.
      if (currentQaObject.question.type === QUESTION_TYPE_SURVEY) {
        props.updateResultsData(
          CHALLENGE_RESULTS_SURVEY_SCORE,
          currentQaObject.question.data.survey.response.surveyId,
          { score: CHALLENGE_SCORES.incorrect.survey[currentQaObject.difficulty] },
        );
      }
    } else if (resolution === CHALLENGE_RESOLUTION_SURVEY_ANSWER) {
      challengeProgressUpdate.succeeded = true;
      challengeProgressUpdate.correctAnswerCount = 999; // Big number so we don't see this again.

      // Pass the entire surveyPayload object.
      props.updateResultsData(
        CHALLENGE_RESULTS_SURVEY_ANSWER,
        currentQaObject.questionId,
        surveyPayload,
      );
    }

    props.updateChallengeProgress(props.currentChallenge.currentQaId, challengeProgressUpdate);
  };

  const currentQaObject = props.currentChallenge.currentQaId ?
    utils.cacheGetTarget(props.challengeData, props.currentChallenge.currentQaId) : null;

  return (
    <div>
      <Transition.Group {...CHALLENGE_TRANSITION_PROPS}>
        {currentQaObject && [currentQaObject].map(qaObject => (
          <div key={qaObject.id}>
            <ChallengeMain
              qaData={qaObject}
              currentQaProgress={props.challengeProgress[qaObject.id]}
              currentChallenge={props.currentChallenge}
              streak={props.streak}
              resolveCurrentQA={resolveCurrentQA}
              updateCurrentChallengeData={props.updateCurrentChallengeData}
              challengeCompletion={{
                total: props.challengeData.length,
                remaining: props.currentChallenge.qaRemaining,
              }}
            />
          </div>
        ))}
      </Transition.Group>
      <Transition {...CHALLENGE_TRANSITION_PROPS} visible={!currentQaObject}>
        <div>
          <ChallengeComplete
            qaCount={props.challengeData.length}
          />
        </div>
      </Transition>
    </div>
  );
};

ChallengeList.propTypes = {
  challengeData: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired).isRequired,
  challengeProgress: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentChallenge: PropTypes.shape({
    currentQaId: PropTypes.string,  // This will be null on mount so we won't require it.
    qaRemaining: PropTypes.number.isRequired,
  }).isRequired,
  streak: PropTypes.number.isRequired,
  updateChallengeProgress: PropTypes.func.isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
  updateResultsData: PropTypes.func.isRequired,
};

export default ChallengeList;
