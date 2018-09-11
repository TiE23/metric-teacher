import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

class ChallengeResponse extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      foo: null,
    };
  }

  render() {
    return (
      <Segment>
        <p>Challenge Response</p>
        <p>
          Total: {this.props.challengeProgress.total}
          Remaining: {this.props.challengeProgress.remaining}
        </p>
      </Segment>
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
