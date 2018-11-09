import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeAnswerConversionDirectKeypad from "./ChallengeAnswerConversionDirectKeypad";
import ChallengeAnswerConversionDisplay from "./display/ChallengeAnswerConversionDisplay";

import {
  CHALLENGE_KEYPAD_COLUMN_WIDTH,
  CHALLENGE_DISPLAY_SINGLE_INPUT_COLUMN_WIDTH,
  CHALLENGE_DISPLAY_SINGLE_DELETE_COLUMN_WIDTH,
  NEGATIVE_UNITS,
} from "../../../../../constants";

const ChallengeAnswerConversionDirectInput = (props) => {
  const handleKeyInput = (e, { value }) => {
    // If keypad variable is true it'll add to the input instead of replace it.
    const newValue = props.inputValue ? props.inputValue + value : value;

    const val = utils.decimalHelper(newValue); // Typing a "." will automatically fill to "0."
    if (((val && utils.isDecimalTyped(val)) || !val)) {
      props.handleInputUpdate(val);
    }
  };

  const handleNegativeFlip = () => {
    if (props.inputValue && props.inputValue.length > 0) {
      if (props.inputValue[0] === "-") {
        props.handleInputUpdate(props.inputValue.slice(1));
      } else {
        props.handleInputUpdate(`-${props.inputValue}`);
      }
    }
  };

  const handleDelete = () => {
    if (props.inputValue && props.inputValue.length > 0) {
      props.handleInputUpdate(props.inputValue.slice(0, props.inputValue.length - 1));
    }
  };

  return (
    <Grid padded={false} textAlign="center" verticalAlign="middle">
      <Grid.Row>
        <Grid.Column {...CHALLENGE_DISPLAY_SINGLE_INPUT_COLUMN_WIDTH}>
          <ChallengeAnswerConversionDisplay
            contents={[props.inputValue || ""]}
            labels={[utils.unitInitializer(props.inputUnit)]}
            activeInput={0}
            color="blue"
            placeholder={props.placeholder}
          />
        </Grid.Column>
        <Grid.Column {...CHALLENGE_DISPLAY_SINGLE_DELETE_COLUMN_WIDTH}>
          <Icon
            onClick={handleDelete}
            name="arrow alternate circle left outline"
            size="big"
            color="red"
          />
        </Grid.Column>
      </Grid.Row>
      {props.incorrectAnswerHint &&
      <Grid.Row>
        <Grid.Column>
          <p>{props.incorrectAnswerHint}</p>
        </Grid.Column>
      </Grid.Row>
      }
      <Grid.Row>
        <Grid.Column {...CHALLENGE_KEYPAD_COLUMN_WIDTH}>
          <ChallengeAnswerConversionDirectKeypad
            handleKeyInput={handleKeyInput}
            handleNegativeFlip={handleNegativeFlip}
            negativeAvailable={NEGATIVE_UNITS.includes(props.inputUnit)}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ChallengeAnswerConversionDirectInput.propTypes = {
  handleInputUpdate: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  incorrectAnswerHint: PropTypes.string,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChallengeAnswerConversionDirectInput.defaultProps = {
  inputProps: null,
  incorrectAnswerHint: null,
};

export default ChallengeAnswerConversionDirectInput;
