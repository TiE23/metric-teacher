import React from "react";
import PropTypes from "prop-types";

import ChallengeAnswerConversionDirectInput from "./ChallengeAnswerConversionDirectInput";
import ChallengeAnswerConversionDirectInputSplit from "./ChallengeAnswerConversionDirectInputSplit";

import {
  SPLIT_UNITS,
} from "../../../../../constants";

const ChallengeAnswerConversionDirect = (props) => {
  const handleInputUpdate = (value) => {
    props.updateCurrentChallengeData({ inputData: value });
  };

  if (Object.keys(SPLIT_UNITS).includes(props.inputUnit)) {
    return (
      <ChallengeAnswerConversionDirectInputSplit
        handleInputUpdate={handleInputUpdate}
        inputUnit={props.inputUnit}
        inputValue={props.inputtedAnswer || ""}
        placeholder="..."
        incorrectAnswerHint={props.incorrectAnswerHint}
      />
    );
  } else {
    return (
      <ChallengeAnswerConversionDirectInput
        handleInputUpdate={handleInputUpdate}
        inputUnit={props.inputUnit}
        inputValue={props.inputtedAnswer || ""}
        placeholder="..."
        incorrectAnswerHint={props.incorrectAnswerHint}
      />
    );
  }
};

ChallengeAnswerConversionDirect.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputtedAnswer: PropTypes.string,
  incorrectAnswerHint: PropTypes.string,
};

ChallengeAnswerConversionDirect.defaultProps = {
  inputtedAnswer: null,
  incorrectAnswerHint: null,
};

export default ChallengeAnswerConversionDirect;
