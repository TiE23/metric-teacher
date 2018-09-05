import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Transition, Segment } from "semantic-ui-react";
import random from "lodash/random";
import forEach from "lodash/forEach";

import ChallengeMain from "./main/ChallengeMain";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

class ChallengeList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentQaId: null,
    };

    const getNextRandomQaId = (challengeProgress, oldQaId) => {
      const remainingQaIds = [];

      forEach(challengeProgress, (row, id) => {
        if (!row.skipped && !row.correctlyAnswered && !row.failed) {
          remainingQaIds.push(id);
        }
      });

      console.log("Q's remaining", remainingQaIds.length);

      // Return null if we're out of QAs.
      if (remainingQaIds.length === 0) {
        return null;
      }

      // We have just one left, return it.
      if (remainingQaIds.length === 1) {
        return remainingQaIds[0];
      }

      // If we have more than one left do not repeat the same QA id.
      let candidateId;
      do {
        candidateId = remainingQaIds[random(remainingQaIds.length - 1)];
      } while (candidateId === oldQaId);

      return candidateId;
    };

    this.componentDidMount = () => {
      // When resuming from saved state the challengeProgress prop will be set immediately.
      if (!utils.isEmptyRecursive(this.props.challengeProgress)) {
        this.setState(prevState => ({
          currentQaId: getNextRandomQaId(this.props.challengeProgress, prevState.currentQaId),
        }));
      }
    };

    this.componentDidUpdate = (prevProps, prevState) => {
      if (this.props.challengeProgress !== prevProps.challengeProgress) {
        this.setState({
          currentQaId: getNextRandomQaId(this.props.challengeProgress, prevState.currentQaId),
        });
      }
    };

    this.resolveCurrentQA = (resolution) => {
      const challengeProgressUpdateFragment = {};
      if (resolution === "skip") {
        challengeProgressUpdateFragment[this.state.currentQaId] = { skipped: true };
      }
      // TODO - Other resolutions

      this.props.updateChallengeProgress(challengeProgressUpdateFragment);
    };
  }

  render() {
    if (this.state.currentQaId) {
      const currentQaObject =
        utils.cacheGetTarget(this.props.challengeData, this.state.currentQaId);

      return (
        <div>
          <p>ChallengeList</p>
          <Transition.Group animation="fly left" duration={{ show: 500, hide: 0 }}>
            {[currentQaObject].map(qaObject => (
              <Segment key={qaObject.id}>
                <ChallengeMain
                  qaData={qaObject}
                  resolveCurrentQA={this.resolveCurrentQA}
                />
              </Segment>
            ))}
          </Transition.Group>
        </div>
      );
    } else {
      return (
        <span>...</span>
      );
    }
  }

}

ChallengeList.propTypes = {
  challengeData: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired).isRequired,
  challengeProgress: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateChallengeProgress: PropTypes.func.isRequired,
};

export default ChallengeList;
