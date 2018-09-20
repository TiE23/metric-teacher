import React from "react";
import PropTypes from "prop-types";

import ChallengeConversionDirectInput from "./ChallengeConversionDirectInput";
import ChallengeConversionDirectInputSplit from "./ChallengeConversionDirectInputSplit";

import {
  SPLIT_UNITS,
} from "../../../../../constants";

const ChallengeConversionDirect = (props) => {
  const handleInputUpdate = (value) => {
    props.updateCurrentChallengeData({ inputData: value });
  };

  if (Object.keys(SPLIT_UNITS).includes(props.inputUnit)) {
    return (
      <ChallengeConversionDirectInputSplit
        handleInputUpdate={handleInputUpdate}
        inputUnit={props.inputUnit}
        inputValue={props.inputtedAnswer || ""}
        placeholder="..."
      />
    );
  } else {
    return (
      <ChallengeConversionDirectInput
        handleInputUpdate={handleInputUpdate}
        inputUnit={props.inputUnit}
        inputValue={props.inputtedAnswer || ""}
        placeholder="..."
      />
    );
  }
};

ChallengeConversionDirect.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputtedAnswer: PropTypes.string,
};

ChallengeConversionDirect.defaultProps = {
  inputtedAnswer: null,
};

export default ChallengeConversionDirect;
