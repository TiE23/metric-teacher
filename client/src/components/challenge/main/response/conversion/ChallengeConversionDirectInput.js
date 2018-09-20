import React from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeConversionDirectKeypad from "./ChallengeConversionDirectKeypad";
import ChallengeAnswerConversionDisplay from "./display/ChallengeAnswerConversionDisplay";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
} from "../../../../../constants";

const ChallengeConversionDirectInput = props => (
  <Grid padded={false} textAlign="center" verticalAlign="middle">
    <Grid.Row>
      <Grid.Column width={8}>
        <ChallengeAnswerConversionDisplay
          content={props.inputValue || ""}
          label={utils.unitInitilizer(props.inputUnit)}
          active
          placeholder={props.placeholder}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        <Icon
          onClick={props.handleDelete}
          name="arrow alternate circle left outline"
          size="big"
          color="red"
        />
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
