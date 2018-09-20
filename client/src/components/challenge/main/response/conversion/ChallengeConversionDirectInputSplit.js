/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeConversionDirectKeypad from "./ChallengeConversionDirectKeypad";
import ChallengeAnswerConversionDisplay from "./display/ChallengeAnswerConversionDisplay";

import {
  CHALLENGE_KEYPAD_COLUMN_WIDTH,
  CHALLENGE_DISPLAY_SPLIT_INPUT_COLUMN_WIDTH,
  CHALLENGE_DISPLAY_SPLIT_DELETE_COLUMN_WIDTH,
  SPLIT_UNITS,
} from "../../../../../constants";

class ChallengeConversionDirectInputSplit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [null, null, null],
      activeInput: SPLIT_UNITS[this.props.inputUnit] ?
        SPLIT_UNITS[this.props.inputUnit].units.length - 1 : 0,
    };

    this.units = SPLIT_UNITS[this.props.inputUnit] ?
      SPLIT_UNITS[this.props.inputUnit].units : [this.props.inputUnit];

    /**
     * Converts [2, 6, 0] to 30. (2ft 6in to 30in).
     * @param inputs
     * @param inputUnit
     * @returns {string}
     */
    const calculateFromInputs = (inputs, inputUnit) => {
      const numberInputs = inputs.map(input => parseFloat(input || 0));

      if (SPLIT_UNITS[inputUnit]) {
        return SPLIT_UNITS[inputUnit].implode(numberInputs);
      }

      return "";
    };

    /**
     * Converts 30 to [2, 6, 0] (30in to 2ft 6in).
     * @param input
     * @param inputUnit
     * @returns {string[]}
     */
    const calculateToInputs = (input, inputUnit) => {
      const numberInput = parseFloat(input);
      if (!Number.isNaN(numberInput) && SPLIT_UNITS[inputUnit]) {
        return SPLIT_UNITS[inputUnit].explode(numberInput);
      }

      return [null, null, null];
    };

    const setActiveInput = inputNumber => this.setState({ activeInput: inputNumber });
    this.activateInput0 = () => setActiveInput(0);
    this.activateInput1 = () => setActiveInput(1);
    this.activateInput2 = () => setActiveInput(2);

    const updateInputs = (value, inputNumber, keypad) => {
      const newInputs = this.state.inputs;

      newInputs[inputNumber] = keypad ?
        newInputs[inputNumber] ?
          newInputs[inputNumber] + value : value : value;

      this.props.handleInputUpdate(
        null,
        { value: calculateFromInputs(newInputs, this.props.inputUnit) },
        false,
      );
    };

    this.updateInput0 = (e, { value }, keypad = false) => updateInputs(value, 0, keypad);
    this.updateInput1 = (e, { value }, keypad = false) => updateInputs(value, 1, keypad);
    this.updateInput2 = (e, { value }, keypad = false) => updateInputs(value, 2, keypad);

    this.handleDelete = () => {
      const { inputs, activeInput } = this.state;
      const currentInput = inputs[activeInput];

      if (currentInput && currentInput.length > 0) {
        updateInputs(currentInput.slice(0, currentInput.length - 1), activeInput);
      }
    };

    this.componentDidUpdate = (prevProps, prevState) => {
      // Update inputs state when the inputValue prop changes.
      if (this.props.inputValue !== prevProps.inputValue) {
        this.setState({ inputs: calculateToInputs(this.props.inputValue, this.props.inputUnit) });
      }
    };

    this.componentDidMount = () => {
      // Update inputs state when mounted and prop inputValue is set (when reloading).
      if (this.props.inputValue) {
        this.setState({ inputs: calculateToInputs(this.props.inputValue, this.props.inputUnit) });
      }
    };
  }

  render() {
    return (
      <Grid padded={false} textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column {...CHALLENGE_DISPLAY_SPLIT_INPUT_COLUMN_WIDTH}>
            <ChallengeAnswerConversionDisplay
              contents={this.state.inputs}
              labels={this.units.map(unit => utils.unitInitializer(unit))}
              activeInput={this.state.activeInput}
              onClicks={[this.activateInput0, this.activateInput1, this.activateInput2]}
              color="blue"
              placeholder={this.props.placeholder}
            />
          </Grid.Column>
          <Grid.Column {...CHALLENGE_DISPLAY_SPLIT_DELETE_COLUMN_WIDTH}>
            <Icon
              onClick={this.handleDelete}
              name="arrow alternate circle left outline"
              size="big"
              color="red"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column {...CHALLENGE_KEYPAD_COLUMN_WIDTH}>
            <ChallengeConversionDirectKeypad
              handleInputUpdate={
                this.state.activeInput === 0 ? this.updateInput0 :
                  this.state.activeInput === 1 ? this.updateInput1 : this.updateInput2
              }
              handleNegativeFlip={this.props.handleNegativeFlip}
              negativeAvailable={false}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

ChallengeConversionDirectInputSplit.propTypes = {
  handleInputUpdate: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ChallengeConversionDirectInputSplit.defaultProps = {
  inputProps: null,
};

export default ChallengeConversionDirectInputSplit;
