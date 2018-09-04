import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import utils from "../../utils";

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

    this.saveState = () => {
      utils.writeChallengeStateLocalStorage(this.state);
    };
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.saveState}>Save State</button>
        <pre>
          {JSON.stringify(this.state.challengeData, null, 2)}
        </pre>
      </div>
    );
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
