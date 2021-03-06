import React from "react";
import PropTypes from "prop-types";
import { Segment, Icon } from "semantic-ui-react";

const ChallengeAnswerMultipleChoiceOption = props => (
  <Segment
    inverted={props.selected}
    secondary={props.wrong}
    color={props.selected ? "blue" : null}
    onClick={() => props.handleSelect(props.number)}
    style={{ cursor: "pointer" }}
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
  wrong: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default ChallengeAnswerMultipleChoiceOption;
