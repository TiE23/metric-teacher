import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ChallengeMultipurposeBar from "./ChallengeMultipurposeBar";

class ChallengeResponse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showSubmitButton: false,
    };

    this.toggleSubmit = () => {
      this.setState(prevState => ({ showSubmitButton: !prevState.showSubmitButton }));
    };
  }

  render() {
    return (
      <div>
        <ChallengeMultipurposeBar
          showSubmitButton={this.state.showSubmitButton}
          challengeProgress={this.props.challengeProgress}
        />
        <p>Challenge Response</p>
        <button onClick={this.toggleSubmit}>Togg</button>
      </div>
    );
  }
}

ChallengeResponse.propTypes = {
  challengeProgress: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeResponse;
