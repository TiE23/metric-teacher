import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

class ChallengeHandler extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      progress: null,
    };
  }

  render() {
    return (
      <div>
        <p>ChallengeHandler</p>
        <pre>
          {JSON.stringify(this.props.challenge, null, 2)}
        </pre>
      </div>
    );
  }
}

ChallengeHandler.propTypes = {
  challenge: PropTypes.arrayOf(QA_DATA_EVERYTHING.isRequired),
};

ChallengeHandler.defaultProps = {
  challenge: null,
};

export default ChallengeHandler;
