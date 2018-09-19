import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeConversionDirectKeypad from "./ChallengeConversionDirectKeypad";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
} from "../../../../../constants";

const ChallengeConversionDirect = (props) => {
  const handleInputUpdate = (e, { value }, keypad = false) => {
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

  return (
    <Grid textAlign="center">
      <Grid.Row>
        <Grid.Column>
          <Input
            label={{ basic: true, content: utils.unitInitilizer(props.inputUnit) }}
            labelPosition="right"
            value={props.inputtedAnswer || ""}
            onChange={handleInputUpdate}
            placeholder="Enter answer..."
          />
          {" "}
          <Button
            onClick={handleDelete}
            disabled={!props.inputtedAnswer}
            color="red"
            basic
          >
            Delete
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
          <ChallengeConversionDirectKeypad
            handleInputUpdate={handleInputUpdate}
            handleNegativeFlip={handleNegativeFlip}
            negativeAvailable={props.inputUnit === "f" || props.inputUnit === "c"}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
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
