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
    modalContent="Are you sure you want to skip filling out this survey? If you simply don't want to answer right now you can select &quot;Ask Me Later&quot; and we'll ask you another time. If you select &quot;Skip Survey&quot; you won't be asked again. If you change your mind you can find the survey in your User Profile page."
    modalRejectLabel="Reconsider"
    modalRejectColor="teal"
    modalRejectIcon="step backward"
    modalActions={[
      {
        modalAcceptClick: props.handleSkipQa,
        modalAcceptLabel: "Ask Me Later",
        modalAcceptColor: "yellow",
        modalAcceptIcon: "pause",
      },
      {
        modalAcceptClick: props.handleSkipQa,
        modalAcceptLabel: "Skip Survey",
        modalAcceptColor: "orange",
        modalAcceptIcon: "step forward",
      },
    ]}
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
