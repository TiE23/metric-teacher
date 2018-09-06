import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const ChallengeSkip = props => (
  <Button
    onClick={props.handleSkipQa}
    color="orange"
    size="small"
    compact
    fluid
  >
    Skip
  </Button>
);

ChallengeSkip.propTypes = {
  handleSkipQa: PropTypes.func.isRequired,
};

export default ChallengeSkip;
