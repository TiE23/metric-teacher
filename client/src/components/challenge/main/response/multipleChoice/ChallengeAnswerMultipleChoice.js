import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

import ChallengeAnswerMultipleChoiceOption from "./ChallengeAnswerMultipleChoiceOption";

import {
  UNIT_WORDS,
} from "../../../../../constants";

const ChallengeAnswerMultipleChoice = (props) => {
  if (!props.choicesSelected) {
    return null;  // This component requires these to function.
  }

  const handleAnswerSelect = (answerNumber) => {
    props.updateCurrentChallengeData({ answerData: { selectedAnswer: answerNumber } });
  };

  const makeText = ({ value, written, unit }) => {
    if (written) {
      return written;
    } else if (utils.t0(value)) {
      return utils.unitWorder(value, UNIT_WORDS[unit], true);
    }
    return "Unknown";
  };

  const choiceComponents = props.choicesSelected.map(choiceNumber => (
    <ChallengeAnswerMultipleChoiceOption
      key={`choice_${choiceNumber}`}
      number={choiceNumber}
      text={makeText(props.choices[choiceNumber])}
      selected={props.selectedAnswer === choiceNumber}
      handleSelect={handleAnswerSelect}
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
};

ChallengeAnswerMultipleChoice.propTypes = {
  choices: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    written: PropTypes.string,
    unit: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
  choicesSelected: PropTypes.arrayOf(PropTypes.number), // This will temporarily be undefined.
  selectedAnswer: PropTypes.number,
};

ChallengeAnswerMultipleChoice.defaultProps = {
  choicesSelected: null,
  selectedAnswer: null,
};

export default ChallengeAnswerMultipleChoice;
