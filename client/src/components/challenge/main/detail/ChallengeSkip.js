import React from "react";
import PropTypes from "prop-types";

import LoadingButton from "../../../misc/LoadingButton";

const ChallengeSkip = props => (
  <LoadingButton
    buttonText={props.showClearButton ? "Clear" : "Skip"}
    onClick={props.showClearButton ? props.handleClearQa : props.handleSkipQa}
    buttonProps={{
      color: props.showClearButton ? "yellow" : "orange",
      size: "small",
      compact: true,
      fluid: true,
    }}
    confirmModal={props.showSurveySkipConfirm && !props.showClearButton}
    modalContent="Are you sure you want to skip filling out this survey? You won't be asked again. If you change your mind you can find the survey in your My Details page."
    modalRejectLabel="Reconsider"
    modalRejectColor="teal"
    modalAcceptLabel="Skip Survey"
    modalAcceptColor="orange"
  />
);

ChallengeSkip.propTypes = {
  showClearButton: PropTypes.bool.isRequired,
  showSurveySkipConfirm: PropTypes.bool,
  handleSkipQa: PropTypes.func.isRequired,
  handleClearQa: PropTypes.func.isRequired,
};

ChallengeSkip.defaultProps = {
  showSurveySkipConfirm: false,
};

export default ChallengeSkip;
