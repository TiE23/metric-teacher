import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeAnswerMultipleChoiceOption from "./ChallengeAnswerMultipleChoiceOption";

// TODO - Switch to functional component
class ChallengeAnswerMultipleChoice extends PureComponent {
  constructor(props) {
    super(props);

    // TODO - Write this to challenge state so that a student cannot refresh repeatedly to get
    // new options until they realize the common (correct) answer.
    this.choicesSelected =
      utils.choiceSelector(this.props.mode, this.props.choices.length, this.props.choicesOffered);

    this.handleAnswerSelect = (answerNumber) => {
      this.props.updateCurrentQaData({ answerData: { selectedAnswer: answerNumber } });
    };
  }

  render() {
    const choiceComponents = this.choicesSelected.map(choiceNumber => (
      <ChallengeAnswerMultipleChoiceOption
        key={`choice_${choiceNumber}`}
        number={choiceNumber}
        text={this.props.choices[choiceNumber].written}
        selected={this.props.selectedAnswer === choiceNumber}
        handleSelect={this.handleAnswerSelect}
      />
    ));

    const gridRows = [];
    for (let optionNumber = 0; optionNumber < choiceComponents.length; optionNumber += 2) {
      gridRows.push(
        <Grid.Row
          key={`row_${(optionNumber / 2) + 1}`}
          stretched
        >
          <Grid.Column>
            {choiceComponents[optionNumber] || null}
          </Grid.Column>
          <Grid.Column>
            {choiceComponents[optionNumber + 1] || null}
          </Grid.Column>
        </Grid.Row>,
      );
    }

    return (
      <Grid
        stackable
        columns="equal"
        padded={false}
      >
        {gridRows}
      </Grid>
    );
  }
}

ChallengeAnswerMultipleChoice.propTypes = {
  mode: PropTypes.string.isRequired,
  choicesOffered: PropTypes.number.isRequired,
  choices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    written: PropTypes.string,
    unit: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  updateCurrentQaData: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.number,
};

ChallengeAnswerMultipleChoice.defaultProps = {
  selectedAnswer: null,
};

export default ChallengeAnswerMultipleChoice;
