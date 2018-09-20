import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

const ChallengeAnswerConversionDisplay = (props) => {
  const segments = [];

  // Create each Segment element. There are two per unit: the input and the label.
  props.labels.forEach((label, index) => {
    segments.push(
      <Segment
        key={`input_${label}`}
        compact
        color={props.activeInput === index ? props.color : null}
        onClick={props.onClicks && props.onClicks[index]}
      >
        <span style={props.activeInput === index ? null : { color: "grey" }}>
          {props.contents[index] || props.placeholder}
        </span>
      </Segment>,
    );

    segments.push(
      <Segment
        key={`unit_${label}`}
        compact
        color={props.activeInput === index ? props.color : null}
        inverted={props.activeInput === index}
        onClick={props.onClicks && props.onClicks[index]}
      >
        <strong>
          {label}
        </strong>
      </Segment>,
    );
  });

  return (
    <Segment.Group
      horizontal
      compact
    >
      {segments}
    </Segment.Group>
  );
};

ChallengeAnswerConversionDisplay.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.string).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeInput: PropTypes.number.isRequired,
  onClicks: PropTypes.arrayOf(PropTypes.func),
  color: PropTypes.string,
  placeholder: PropTypes.string,
};

ChallengeAnswerConversionDisplay.defaultProps = {
  color: "blue",
  placeholder: "",
  onClicks: [],
};

export default ChallengeAnswerConversionDisplay;
