import React from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const ChallengeSkip = props => (
  // TODO - Make skip have a confirm dialog.
  <Button
    onClick={props.showClearButton ? props.handleClearQa : props.handleSkipQa}
    color={props.showClearButton ? "yellow" : "orange"}
    size="small"
    compact
    fluid
  >
    {props.showClearButton ? "Clear" : "Skip"}
  </Button>
);

ChallengeSkip.propTypes = {
  showClearButton: PropTypes.bool.isRequired,
  handleSkipQa: PropTypes.func.isRequired,
  handleClearQa: PropTypes.func.isRequired,
};

export default ChallengeSkip;
