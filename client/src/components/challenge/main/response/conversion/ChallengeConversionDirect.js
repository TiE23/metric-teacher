import React from "react";
import PropTypes from "prop-types";

import utils from "../../../../../utils";

import ChallengeConversionDirectInput from "./ChallengeConversionDirectInput";
import ChallengeConversionDirectInputSplit from "./ChallengeConversionDirectInputSplit";

import {
  SPLIT_UNITS,
} from "../../../../../constants";

const ChallengeConversionDirect = (props) => {
  const handleInputUpdate = (e, { value }, keypad = false) => {
    // If keypad variable is true it'll add to the input instead of replace it.
    const newValue = keypad ? (props.inputtedAnswer ? props.inputtedAnswer + value : value) : value;

    const val = utils.decimalHelper(newValue); // Typing a "." will automatically fill to "0."
    if (((val && utils.isDecimalTyped(val)) || !val)) {
      props.updateCurrentChallengeData({ inputData: val }); // This is a string.
    }
  };

  const handleNegativeFlip = () => {
    if (props.inputtedAnswer && props.inputtedAnswer.length > 0) {
      if (props.inputtedAnswer[0] === "-") {
        props.updateCurrentChallengeData({ inputData: props.inputtedAnswer.slice(1) });
      } else {
        props.updateCurrentChallengeData({ inputData: `-${props.inputtedAnswer}` });
      }
    }
  };

  const handleDelete = () => {
    if (props.inputtedAnswer && props.inputtedAnswer.length > 0) {
      props.updateCurrentChallengeData({
        inputData: props.inputtedAnswer.slice(0, props.inputtedAnswer.length - 1),
      });
    }
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
        handleNegativeFlip={handleNegativeFlip}
        handleDelete={handleDelete}
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
