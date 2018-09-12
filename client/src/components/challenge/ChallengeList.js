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
    const challengeProgressUpdateFragment = {};
    if (resolution === "skip") {
      challengeProgressUpdateFragment[props.currentQa.currentQaId] = { skipped: true };
    }
    // TODO - Other resolutions

    // Reset to null for the next question.
    props.updateCurrentQaData({ answerData: null, choices: null });
    props.updateChallengeProgress(challengeProgressUpdateFragment);
  };

  const currentQaObject = props.currentQa.currentQaId ?
    utils.cacheGetTarget(props.challengeData, props.currentQa.currentQaId) : null;

  return (
    <div>
      <Transition.Group {...CHALLENGE_TRANSITION_PROPS}>
        {currentQaObject && [currentQaObject].map(qaObject => (
          <div key={qaObject.id}>
            <ChallengeMain
              qaData={qaObject}
              currentQaProgress={props.challengeProgress[qaObject.id]}
              currentQa={props.currentQa}
              resolveCurrentQA={resolveCurrentQA}
              updateCurrentQaData={props.updateCurrentQaData}
              challengeCompletion={{
                total: props.challengeData.length,
                remaining: props.currentQa.qaRemaining,
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
  currentQa: PropTypes.shape({
    currentQaId: PropTypes.string,  // This will be null on mount so we won't require it.
    qaRemaining: PropTypes.number.isRequired,
  }).isRequired,
  updateChallengeProgress: PropTypes.func.isRequired,
  updateCurrentQaData: PropTypes.func.isRequired,
};

export default ChallengeList;
