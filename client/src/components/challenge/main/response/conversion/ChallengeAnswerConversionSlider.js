import React from "react";
import PropTypes from "prop-types";
import { Form, Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

import {
  UNIT_WORDS,
} from "../../../../../constants";

const ChallengeAnswerConversionSlider = (props) => {
  const handleInputUpdate = (e, { value }) => {
    // Survey answers have their inputData structured in an object.
    if (props.surveyAnswerMode) {
      props.updateCurrentChallengeData({ inputData: { value: parseFloat(value) } });
    } else {
      props.updateCurrentChallengeData({ inputData: parseFloat(value) });
    }
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
      {props.incorrectAnswerHint &&
        <Grid.Row>
          <Grid.Column>
            <p>{props.incorrectAnswerHint}</p>
          </Grid.Column>
        </Grid.Row>
      }
    </Grid>
  );
};

ChallengeAnswerConversionSlider.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputtedAnswer: PropTypes.number,
  rangeMin: PropTypes.number.isRequired,
  rangeMax: PropTypes.number.isRequired,
  rangeStep: PropTypes.number.isRequired,
  surveyAnswerMode: PropTypes.bool,
  incorrectAnswerHint: PropTypes.string,
};

ChallengeAnswerConversionSlider.defaultProps = {
  inputtedAnswer: null,
  surveyAnswerMode: false,
  incorrectAnswerHint: null,
};

export default ChallengeAnswerConversionSlider;
