/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid, Icon } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeConversionDirectKeypad from "./ChallengeConversionDirectKeypad";
import ChallengeAnswerConversionDisplay from "./display/ChallengeAnswerConversionDisplay";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
} from "../../../../../constants";

class ChallengeConversionDirectInputSplit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [null, null, null],
      activeInput: 0,
    };

    if (this.props.inputUnit === "in") {
      this.units = ["ft", "in", ""];
    } else if (this.props.inputUnit === "oz") {
      this.units = ["lb", "oz", ""];
    } else if (this.props.inputUnit === "floz") {
      this.units = ["gal", "qt", "floz"];
    }

    /**
     * Converts [2, 6, 0] to 30. (2ft 6in to 30in).
     * @param inputs
     * @param inputUnit
     * @returns {string}
     */
    const calculateFromInputs = (inputs, inputUnit) => {
      const numberInputs = inputs.map(input => parseFloat(input || 0));

      if (inputUnit === "in") {
        return String((Math.floor(numberInputs[0]) * 12) + numberInputs[1]);
      } else if (inputUnit === "oz") {
        return String((Math.floor(numberInputs[0]) * 16) + numberInputs[1]);
      } else if (inputUnit === "floz") {
        return String((Math.floor(numberInputs[0]) * 128) +
          (Math.floor(numberInputs[1]) * 32) + numberInputs[2]);
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
      if (Number.isNaN(numberInput)) {
        return [null, null, null];
      }

      if (inputUnit === "in") {
        return [
          String(Math.floor(numberInput / 12)), // ft
          String(numberInput % 12),             // in
          String(0),
        ];
      } else if (inputUnit === "oz") {
        return [
          String(Math.floor(numberInput / 16)), // lbs
          String(numberInput % 16),             // oz
          String(0),
        ];
      } else if (inputUnit === "floz") {
        return [
          String(Math.floor(numberInput / 128)),        // gal
          String(Math.floor((numberInput % 128) / 32)), // qt
          String(numberInput % 32),                     // floz
        ];
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
    const displayColumnWidth = this.props.inputUnit === "floz" ? 4 : 4;
    const deleteColumnWidth = this.props.inputUnit === "floz" ? 2 : 2;

    return (
      <Grid padded={false} textAlign="center" verticalAlign="middle">
        <Grid.Row>
          <Grid.Column width={displayColumnWidth}>
            <ChallengeAnswerConversionDisplay
              onClick={this.activateInput0}
              content={this.state.inputs[0] || ""}
              label={utils.unitInitilizer(this.units[0])}
              active={this.state.activeInput === 0}
              placeholder={this.props.placeholder}
            />
          </Grid.Column>
          <Grid.Column width={displayColumnWidth}>
            <ChallengeAnswerConversionDisplay
              onClick={this.activateInput1}
              content={this.state.inputs[1] || ""}
              label={utils.unitInitilizer(this.units[1])}
              active={this.state.activeInput === 1}
              placeholder={this.props.placeholder}
            />
          </Grid.Column>
          {this.props.inputUnit === "floz" &&
            <Grid.Column width={displayColumnWidth}>
              <ChallengeAnswerConversionDisplay
                onClick={this.activateInput2}
                content={this.state.inputs[2] || ""}
                label={utils.unitInitilizer(this.units[2])}
                active={this.state.activeInput === 2}
                placeholder={this.props.placeholder}
              />
            </Grid.Column>
          }
          <Grid.Column width={deleteColumnWidth}>
            <Icon
              onClick={this.handleDelete}
              name="arrow alternate circle left outline"
              size="big"
              color="red"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
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
