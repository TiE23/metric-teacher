import React from "react";
import PropTypes from "prop-types";
import { Form, Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

import {
  UNIT_WORDS,
} from "../../../../../constants";

const ChallengeConversionSlider = (props) => {
  const handleInputUpdate = (e, { value }) => {
    props.updateCurrentChallengeData({ inputData: parseFloat(value) });
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column as={Form}>
          <Form.Input
            label={
              utils.t0(props.inputtedAnswer) ?
                utils.unitWorder(props.inputtedAnswer, UNIT_WORDS[props.inputUnit], true) :
                "Select a value"
            }
            value={utils.t0t(props.inputtedAnswer, "")}
            onChange={handleInputUpdate}
            min={props.rangeMin}
            max={props.rangeMax}
            step={props.rangeStep}
            name="input"
            type="range"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ChallengeConversionSlider.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputtedAnswer: PropTypes.number,
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeStep: PropTypes.number.isRequired,
};

ChallengeConversionSlider.defaultProps = {
  inputtedAnswer: 0,
};

export default ChallengeConversionSlider;
