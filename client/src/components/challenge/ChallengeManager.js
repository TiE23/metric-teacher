import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import mergeWith from "lodash/mergeWith";

import utils from "../../utils";

import ChallengeList from "./ChallengeList";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

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
      this.state.challengeResults !== prevState.challengeResults
      ) {
        utils.writeChallengeStateLocalStorage(this.state);
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
          updateChallengeProgress={this.updateChallengeProgress}
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
