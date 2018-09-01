import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

class ChallengeHandler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.props.challengeState;
  }

  render() {
    return (
      <div>
        <p>ChallengeHandler</p>
        <p>ChallengeId: {this.state.challengeId}</p>
        <pre>
          {JSON.stringify(this.state.challengeData, null, 2)}
        </pre>
      </div>
    );
  }
}

ChallengeHandler.propTypes = {
  challengeState: PropTypes.shape({
    challengeId: PropTypes.string.isRequired,
    challengeData: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired),
    challengeProgress: PropTypes.object,
    challengeResults: PropTypes.object,
  }),
};

ChallengeHandler.defaultProps = {
  challengeState: {},
};

export default ChallengeHandler;
