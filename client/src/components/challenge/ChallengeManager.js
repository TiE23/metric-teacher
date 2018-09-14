import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import mergeWith from "lodash/mergeWith";
import forEach from "lodash/forEach";
import random from "lodash/random";
import findIndex from "lodash/findIndex";

import utils from "../../utils";

import ChallengeList from "./ChallengeList";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  CHALLENGE_ANSWER_MODE_WRITTEN,
  CHALLENGE_ANSWER_MODE_GENERATED,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../constants";

class ChallengeManager extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      challengeId: null,      // This gets overwritten immediately.
      challengeData: null,    // This gets overwritten immediately.
      challengeProgress: {},  // Begins as empty. Is filled in componentDidMount().
      challengeResults: {     // Begins as empty. Will be filled as challenge progresses.
        studentid: this.props.studentId,
        masteryscoreinput: [],
        surveyscoreinput: [],
        surveyanswerinput: [],
      },
      currentChallenge: {
        currentQaId: null,
        qaRemaining: 0,
        answerData: null,
        choicesSelected: [],
      },
      ...this.props.challengeState, // Full state or just challengeId and challengeData.
    };

    this.componentDidMount = () => {
      if (utils.isEmptyRecursive(this.state.challengeProgress)) {
        this.setState(prevState => ({
          challengeProgress: buildInitialChallengeProgress(prevState.challengeData),
        }));
      }
    };

    this.componentDidUpdate = (prevProps, prevState) => {
      // When changes to the state of the challenge are detected write the state to localstorage.
      if (this.state.challengeData !== prevState.challengeData ||
      this.state.challengeProgress !== prevState.challengeProgress ||
      this.state.challengeResults !== prevState.challengeResults ||
      this.state.currentChallenge !== prevState.currentChallenge
      ) {
        utils.writeChallengeStateLocalStorage(this.state);
      }

      // There was change in the progress. That means we need to move to the next question.
      if (this.state.challengeProgress !== prevState.challengeProgress) {
        // Get the next qaId and an updated count of remaining QAs.
        const { currentQaId, qaRemaining } = getNextRandomQaId(
          this.state.challengeProgress, // eslint-disable-line react/no-access-state-in-setstate
          prevState.currentChallenge.currentQaId,
        );

        // TODO - Simplify this if statement more.
        // With a new question let's generate the multiple-choice options now.
        if (currentQaId) {
          const currentQaData = utils.cacheGetTarget(this.state.challengeData, currentQaId);
          let choicesSelected = null;

          if (currentQaData.question.type === QUESTION_TYPE_WRITTEN) {
            choicesSelected = utils.choiceSelector(
              CHALLENGE_ANSWER_MODE_WRITTEN,
              currentQaData.answer.data.multiple.choices.length,
              currentQaData.answer.data.multiple.choicesOffered,
            );
          } else if ((currentQaData.question.type === QUESTION_TYPE_CONVERSION ||
          currentQaData.question.type === QUESTION_TYPE_SURVEY) &&
          currentQaData.answer.data.conversion) {
            choicesSelected = utils.choiceSelector(
              CHALLENGE_ANSWER_MODE_GENERATED,
              currentQaData.answer.data.conversion.choices.length,
            );
          }
          // Unanswered surveys have no choicesSelected option.

          this.setState(prevState2 => ({ currentChallenge: {
            ...prevState2.currentChallenge,
            currentQaId,
            qaRemaining,
            choicesSelected,
            answerData: null,
          } }));
        } else {
          this.setState(prevState2 => ({ currentChallenge: {
            ...prevState2.currentChallenge,
            currentQaId,
            qaRemaining,
            choicesSelected: null,
            answerData: null,
          } }));
        }
        // This will cause componentDidUpdate() to get run again where it'll see the
        // currentChallenge state was updated and immediately write the new state to local storage.
      }
    };

    const buildInitialChallengeProgress = (challengeData) => {
      const newChallengeProgress = {};
      challengeData.forEach(({ id }) => {
        newChallengeProgress[id] = {
          seen: false,
          skipped: false,
          succeeded: false,
          failed: false,
          correctAnswerCount: 0,
          incorrectAnswerCount: 0,
        };
      });

      return newChallengeProgress;
    };

    const getNextRandomQaId = (challengeProgress, oldQaId) => {
      const remainingQaIds = [];

      forEach(challengeProgress, (row, id) => {
        if (!row.skipped && !row.succeeded && !row.failed) {
          remainingQaIds.push(id);
        }
      });

      // Return null if we're out of QAs.
      if (remainingQaIds.length === 0) {
        return { currentQaId: null, qaRemaining: remainingQaIds.length };
      }

      // We have just one left, return it.
      if (remainingQaIds.length === 1) {
        return { currentQaId: remainingQaIds[0], qaRemaining: remainingQaIds.length };
      }

      // If we have more than one left do not repeat the same QA id.
      let candidateId;
      do {
        candidateId = remainingQaIds[random(remainingQaIds.length - 1)];
      } while (candidateId === oldQaId);

      return { currentQaId: candidateId, qaRemaining: remainingQaIds.length };
    };


    /**
     * Update the challengeProgress data for the current QA.
     * This can be changing the booleans seen, skipped, succeeded, and failed.
     * This can be changing the integers correctAnswerCount and incorrectAnswerCount -- These
     * values are additive instead of replacing the value - they add to the number.
     *
     * @param qaId
     * @param progressUpdateData
     */
    this.updateChallengeProgress = (qaId, progressUpdateData) => {
      const newProgressData = {};

      // The values correctAnswerCount and incorrectAnswerCount are updated by adding to the
      // existing values.
      if (utils.t0(progressUpdateData.correctAnswerCount) ||
      utils.t0(progressUpdateData.incorrectAnswerCount)) {
        const progressUpdateDataCopy = progressUpdateData;

        if (utils.t0(progressUpdateData.correctAnswerCount)) {
          progressUpdateDataCopy.correctAnswerCount +=
            this.state.challengeProgress[qaId].correctAnswerCount;
        }

        if (utils.t0(progressUpdateData.incorrectAnswerCount)) {
          progressUpdateDataCopy.incorrectAnswerCount +=
            this.state.challengeProgress[qaId].incorrectAnswerCount;
        }

        newProgressData[qaId] = progressUpdateDataCopy;
      } else {
        newProgressData[qaId] = progressUpdateData;
      }

      this.setState(prevState => ({
        challengeProgress: mergeWith(
          {},
          prevState.challengeProgress,
          newProgressData,
          utils.mergeCustomizer,
        ),
      }));
    };


    /**
     * Update the currentChallengeData directly.
     * TODO - Consider removing this if it only has one use.
     * @param newCurrentChallengeData
     */
    this.updateCurrentChallengeData = (newCurrentChallengeData) => {
      this.setState(prevState => ({
        currentChallenge: mergeWith(
          {},
          prevState.currentChallenge,
          newCurrentChallengeData,
          // Note: No custom merge function. Null values WILL OVERWRITE existing values.
        ),
      }));
    };


    /**
     * Update the challenge's final results payload.
     *
     * @param mode - "mastery-score", "survey-score", or "survey-answer"
     * @param id - the subSubjectId, surveyId, or questionId respectively for each mode
     * @param payload { score } for modes "mastery-score" and "survey-score"
     *                { score, skip, value, unit, detail } for mode "survey-answer"
     */
    this.updateResultsData = (mode, id, payload) => {
      const updatedInput = {};

      if (mode === "mastery-score") {
        const existingMasteryScoreInputIndex = findIndex(
          this.state.challengeResults.masteryscoreinput,
          masteryScoreInput => masteryScoreInput.subsubjectid === id,
        );

        updatedInput.masteryscoreinput = this.state.challengeResults.masteryscoreinput;

        if (existingMasteryScoreInputIndex !== -1) {
          updatedInput.masteryscoreinput[existingMasteryScoreInputIndex].score += payload.score;
        } else {
          updatedInput.masteryscoreinput.push({ subsubjectid: id, score: payload.score });
        }
      } else if (mode === "survey-score") {
        const existingSurveyScoreInputIndex = findIndex(
          this.state.challengeResults.surveyscoreinput,
          surveyScoreInput => surveyScoreInput.surveyid === id,
        );

        updatedInput.surveyscoreinput = this.state.challengeResults.surveyscoreinput;

        if (existingSurveyScoreInputIndex !== -1) {
          updatedInput.surveyscoreinput[existingSurveyScoreInputIndex].score += payload.score;
        } else {
          updatedInput.surveyscoreinput.push({ surveyid: id, score: payload.score });
        }
      } else if (mode === "survey-answer") {
        const existingSurveyAnswerInputIndex = findIndex(
          this.state.challengeResults.surveyanswerinput,
          surveyAnswerInput => surveyAnswerInput.questionid === id,
        );

        updatedInput.surveyanswerinput = this.state.challengeResults.surveyanswerinput;

        if (existingSurveyAnswerInputIndex !== -1) {
          // Because you won't re-answer a survey in the same single challenge this shouldn't ever
          // happen. But for completeness I've coded it.
          updatedInput.surveyanswerinput[existingSurveyAnswerInputIndex].skip = payload.skip;
          updatedInput.surveyanswerinput[existingSurveyAnswerInputIndex].value = payload.value;
          updatedInput.surveyanswerinput[existingSurveyAnswerInputIndex].unit = payload.unit;
          updatedInput.surveyanswerinput[existingSurveyAnswerInputIndex].score += payload.score;
          updatedInput.surveyanswerinput[existingSurveyAnswerInputIndex].detail = payload.detail;
        } else {
          updatedInput.surveyanswerinput.push({ questionid: id, ...payload });
        }
      }

      // Update the challengeResults state.
      if (!utils.isEmptyRecursive(updatedInput)) {
        this.setState(prevState => ({
          challengeResults: mergeWith(
            {},
            prevState.challengeResults,
            updatedInput,
          ),
        }));
      }
    };
  }

  render() {
    if (utils.isEmptyRecursive(this.state.challengeData) ||
    utils.isEmptyRecursive(this.state.challengeProgress)) {
      return (
        <p>Empty</p>
      );
    } else {
      return (
        <ChallengeList
          challengeData={this.state.challengeData}
          challengeProgress={this.state.challengeProgress}
          currentChallenge={this.state.currentChallenge}
          updateChallengeProgress={this.updateChallengeProgress}
          updateCurrentChallengeData={this.updateCurrentChallengeData}
          updateResultsData={this.updateResultsData}
        />
      );
    }
  }
}

ChallengeManager.propTypes = {
  challengeState: PropTypes.shape({
    challengeId: PropTypes.string.isRequired,
    challengeData: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired),
    challengeProgress: PropTypes.object,
    challengeResults: PropTypes.object,
  }),
  studentId: PropTypes.string.isRequired,
};

ChallengeManager.defaultProps = {
  challengeState: {},
};

export default ChallengeManager;
