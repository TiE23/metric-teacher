import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, Input } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeConversionDirectKeypad from "./ChallengeConversionDirectKeypad";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
} from "../../../../../constants";

const ChallengeConversionDirectInput = props => (
  <Grid textAlign="center">
    <Grid.Row>
      <Grid.Column>
        <Input
          label={{ basic: true, content: utils.unitInitilizer(props.inputUnit) }}
          labelPosition="right"
          value={props.inputValue}
          onChange={props.handleInputUpdate}
          placeholder={props.placeholder}
          {...props.inputProps}
        />
        {" "}
        <Button
          onClick={props.handleDelete}
          disabled={!props.inputValue}
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
          handleInputUpdate={props.handleInputUpdate}
          handleNegativeFlip={props.handleNegativeFlip}
          negativeAvailable={props.inputUnit === "f" || props.inputUnit === "c"}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

ChallengeConversionDirectInput.propTypes = {
  handleInputUpdate: PropTypes.func.isRequired,
  handleNegativeFlip: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChallengeConversionDirectInput.defaultProps = {
  inputProps: null,
};

export default ChallengeConversionDirectInput;
