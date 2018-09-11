import React from "react";
import PropTypes from "prop-types";
import { Segment, Icon } from "semantic-ui-react";

const ChallengeAnswerMultipleChoiceOption = props => (
  <Segment
    inverted={props.selected}
    color={props.selected ? "olive" : null}
    onClick={() => props.handleSelect(props.number)}
  >
    <Icon
      size="large"
      name={props.selected ? "check circle outline" : "circle outline"}
    />
    {props.text}
  </Segment>
);

ChallengeAnswerMultipleChoiceOption.propTypes = {
  number: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default ChallengeAnswerMultipleChoiceOption;
