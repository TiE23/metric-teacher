import React, { PureComponent } from "react";
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
} from "../../constants";

class ChallengeList extends PureComponent {
  constructor(props) {
    super(props);

    this.resolveCurrentQA = (resolution) => {
      const challengeProgressUpdateFragment = {};
      if (resolution === "skip") {
        challengeProgressUpdateFragment[this.props.currentQa.currentQaId] = { skipped: true };
      }
      // TODO - Other resolutions

      this.props.updateChallengeProgress(challengeProgressUpdateFragment);
    };
  }

  render() {
    const currentQaObject = this.props.currentQa.currentQaId ?
      utils.cacheGetTarget(this.props.challengeData, this.props.currentQa.currentQaId) : null;

    return (
      <div>
        <Transition.Group {...CHALLENGE_TRANSITION_PROPS}>
          {currentQaObject && [currentQaObject].map(qaObject => (
            <div key={qaObject.id}>
              <ChallengeMain
                qaData={qaObject}
                currentQaProgress={this.props.challengeProgress[qaObject.id]}
                resolveCurrentQA={this.resolveCurrentQA}
                challengeProgress={{
                  total: this.props.challengeData.length,
                  remaining: this.props.currentQa.qaRemaining,
                }}
              />
            </div>
          ))}
        </Transition.Group>
        <Transition {...CHALLENGE_TRANSITION_PROPS} visible={!currentQaObject}>
          <div>
            <ChallengeComplete
              qaCount={this.props.challengeData.length}
            />
          </div>
        </Transition>

      </div>
    );
  }
}

ChallengeList.propTypes = {
  challengeData: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired).isRequired,
  challengeProgress: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  currentQa: PropTypes.shape({
    currentQaId: PropTypes.string.isRequired,
    qaRemaining: PropTypes.number.isRequired,
  }).isRequired,
  updateChallengeProgress: PropTypes.func.isRequired,
};

export default ChallengeList;
