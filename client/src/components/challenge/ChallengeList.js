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
} from "../../constants";

const ChallengeList = (props) => {
  const resolveCurrentQA = (resolution) => {
    let challengeProgressUpdate;
    if (resolution === "skip") {
      challengeProgressUpdate = { skipped: true };
    }
    // TODO - Other resolutions

    // Reset to null for the next question.
    props.updateCurrentChallengeData({ answerData: null, choicesSelected: null });
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
  updateChallengeProgress: PropTypes.func.isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeList;
