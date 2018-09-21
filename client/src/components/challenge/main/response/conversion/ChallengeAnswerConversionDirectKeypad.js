import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "semantic-ui-react";

import {
  CHALLENGE_KEYPAD_NEGATIVE,
  CHALLENGE_KEYPAD_LAYOUT,
} from "../../../../../constants";

const ChallengeAnswerConversionDirectKeypad = (props) => {
  const handleButtonPress = (e, { value }) => {
    // Handle negative button press.
    if (props.handleNegativeFlip && value === CHALLENGE_KEYPAD_NEGATIVE) {
      props.handleNegativeFlip();
    } else {
      props.handleKeyInput(e, { value });
    }
  };

  const rows = CHALLENGE_KEYPAD_LAYOUT.map(buttonRow => (
    <Grid.Row key={`buttonRow_${buttonRow.join("-")}`}>
      {buttonRow.map(button => (
        <Grid.Column key={`button_${button}`} width={5}>
          <Button
            value={button}
            onClick={handleButtonPress}
            disabled={!props.negativeAvailable && button === CHALLENGE_KEYPAD_NEGATIVE}
            fluid
            compact
            color="blue"
            basic
          >
            {button}
          </Button>
        </Grid.Column>
      ))}
    </Grid.Row>
  ));

  return (
    <Grid
      celled="internally"
      textAlign="center"
      padded={false}
    >
      {rows}
    </Grid>
  );
};

ChallengeAnswerConversionDirectKeypad.propTypes = {
  handleKeyInput: PropTypes.func.isRequired,
  handleNegativeFlip: PropTypes.func,
  negativeAvailable: PropTypes.bool.isRequired,
};

ChallengeAnswerConversionDirectKeypad.defaultProps = {
  handleNegativeFlip: null,
};

export default ChallengeAnswerConversionDirectKeypad;
