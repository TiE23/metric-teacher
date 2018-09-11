import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ChallengeMultipurposeBar from "./ChallengeMultipurposeBar";
import ChallengeAnswerArea from "./ChallengeAnswerArea";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

import {
  QUESTION_TYPE_WRITTEN,
} from "../../../../constants";

// TODO - Switch to functional component
class ChallengeResponse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showSubmitButton: false,
    };
  }

  render() {
    const type =
      this.props.qaData.question.type === QUESTION_TYPE_WRITTEN ? "multiplechoice" : "foo";

    return (
      <div>
        <ChallengeMultipurposeBar
          showSubmitButton={!!this.props.currentQa.answerData}
          challengeProgress={this.props.challengeProgress}
        />
        <ChallengeAnswerArea
          type={type}
          qaData={this.props.qaData}
          currentQa={this.props.currentQa}
          updateCurrentQaData={this.props.updateCurrentQaData}
        />
      </div>
    );
  }
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQa: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  challengeProgress: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentQaData: PropTypes.func.isRequired,
};

export default ChallengeResponse;
