import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

class ChallengeManager extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.props.challengeState;

    this.saveState = () => {
      utils.writeChallengeStateLocalStorage(this.state);
    };
  }

  render() {
    return (
      <div>
        <p>ChallengeManager</p>
        <p>ChallengeId: {this.state.challengeId}</p>
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
};

ChallengeManager.defaultProps = {
  challengeState: {},
};

export default ChallengeManager;
