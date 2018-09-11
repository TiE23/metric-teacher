import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import utils from "../../../../../utils";

import ChallengeAnswerMultipleChoiceOption from "./ChallengeAnswerMultipleChoiceOption";

class ChallengeAnswerMultipleChoice extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswer: null,
    };

    this.handleAnswerSelect = (answerNumber) => {
      this.setState({ selectedAnswer: answerNumber });
    };
  }

  render() {
    const choicesSelected =
      utils.choiceSelector(this.props.mode, this.props.choices.length, this.props.choicesOffered);

    const choiceComponents = choicesSelected.map(choiceNumber => (
      <ChallengeAnswerMultipleChoiceOption
        key={`choice_${choiceNumber}`}
        number={choiceNumber}
        text={this.props.choices[choiceNumber].written}
      />
    ));

    return (
      <div>
        <p>ChallengeAnswerMultipleChoice</p>
        {choiceComponents}
      </div>
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
};

export default ChallengeAnswerMultipleChoice;
