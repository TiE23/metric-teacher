import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "semantic-ui-react";

import {
  CHALLENGE_KEYPAD_NEGATIVE,
  CHALLENGE_KEYPAD_LAYOUT,
} from "../../../../../constants";

const ChallengeConversionDirectKeypad = (props) => {
  const handleButtonPress = (e, { value }) => {
    if (props.handleNegativeFlip && value === CHALLENGE_KEYPAD_NEGATIVE) {
      props.handleNegativeFlip();
    } else {
      props.handleInputUpdate(e, { value }, true);
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

ChallengeConversionDirectKeypad.propTypes = {
  handleInputUpdate: PropTypes.func.isRequired,
  handleNegativeFlip: PropTypes.func,
  negativeAvailable: PropTypes.bool.isRequired,
};

ChallengeConversionDirectKeypad.defaultProps = {
  handleNegativeFlip: null,
};

export default ChallengeConversionDirectKeypad;
