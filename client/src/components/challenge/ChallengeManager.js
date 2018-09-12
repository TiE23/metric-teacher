import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import mergeWith from "lodash/mergeWith";
import forEach from "lodash/forEach";
import random from "lodash/random";

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
      currentQa: {
        currentQaId: null,
        qaRemaining: 0,
        answerData: null,
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
      this.state.currentQa !== prevState.currentQa
      ) {
        utils.writeChallengeStateLocalStorage(this.state);
      }

      // There was change in the progress. That means we need to move to the next question.
      if (this.state.challengeProgress !== prevState.challengeProgress) {
        // Get the next qaId and an updated count of remaining QAs.
        const nextQa = getNextRandomQaId(
          this.state.challengeProgress, // eslint-disable-line react/no-access-state-in-setstate
          prevState.currentQa.currentQaId,
        );

        // With a new question let's generate the multiple-choice options now.
        if (nextQa.currentQaId) {
          const currentQaData = utils.cacheGetTarget(this.state.challengeData, nextQa.currentQaId);
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

          this.setState(prevState2 => ({ currentQa: {
            ...prevState2.currentQa,
            ...nextQa,
            choicesSelected,
          } }));
        } else {
          this.setState(prevState2 => ({ currentQa: {
            ...prevState2.currentQa,
            ...nextQa,
          } }));
        }
        // This will cause componentDidUpdate() to get run again where it'll see the currentQa
        // state was updated and immediately write the new state to local storage.
      }
    };

    const buildInitialChallengeProgress = (challengeData) => {
      const newChallengeProgress = {};
      challengeData.forEach(({ id }) => {
        newChallengeProgress[id] = {
          seen: false,
          skipped: false,
          correctlyAnswered: false,
          failed: false,
          incorrectAnswerCount: 0,
        };
      });

      return newChallengeProgress;
    };

    const getNextRandomQaId = (challengeProgress, oldQaId) => {
      const remainingQaIds = [];

      forEach(challengeProgress, (row, id) => {
        if (!row.skipped && !row.correctlyAnswered && !row.failed) {
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

    this.updateChallengeProgress = (newProgressData) => {
      this.setState(prevState => ({
        challengeProgress: mergeWith(
          {},
          prevState.challengeProgress,
          newProgressData,
          utils.mergeCustomizer,
        ),
      }));
    };

    this.updateCurrentQaData = (newCurrentQaData) => {
      this.setState(prevState => ({
        currentQa: mergeWith(
          {},
          prevState.currentQa,
          newCurrentQaData,
          // Note: No custom merge function. Null values WILL OVERWRITE existing values.
        ),
      }));
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
          currentQa={this.state.currentQa}
          updateChallengeProgress={this.updateChallengeProgress}
          updateCurrentQaData={this.updateCurrentQaData}
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
