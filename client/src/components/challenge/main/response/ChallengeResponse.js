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
          showSubmitButton={this.state.showSubmitButton}
          challengeProgress={this.props.challengeProgress}
        />
        <ChallengeAnswerArea
          type={type}
          qaData={this.props.qaData}
        />
      </div>
    );
  }
}

ChallengeResponse.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  challengeProgress: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeResponse;
