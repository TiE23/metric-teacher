import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

const ChallengeAnswerConversionDisplay = props => (
  <Segment.Group
    onClick={props.onClick}
    horizontal
    compact
    size="mini"
  >
    <Segment
      compact
      color={props.active ? props.color : null}
    >
      <span style={!props.content ? { color: "grey" } : null}>
        {props.content || props.placeholder}
      </span>
    </Segment>
    <Segment
      compact
      color={props.active ? props.color : null}
      inverted={props.active}
    >
      <strong>
        {props.label}
      </strong>
    </Segment>
  </Segment.Group>
);

ChallengeAnswerConversionDisplay.propTypes = {
  content: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
};

ChallengeAnswerConversionDisplay.defaultProps = {
  color: "blue",
  placeholder: "",
  onClick: null,
};

export default ChallengeAnswerConversionDisplay;
