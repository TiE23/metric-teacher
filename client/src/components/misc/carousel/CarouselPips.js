import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const CarouselPips = (props) => {
  const pips = [];

  for (let index = 0; index < props.totalPips; ++index) {
    if ((props.accumulative && index <= props.currentPip) ||
      (!props.accumulative && index === props.currentPip)) {
      pips.push({ key: index, name: props.filledPip });
    } else {
      pips.push({ key: index, name: props.emptyPip });
    }
  }

  return (
    <React.Fragment>
      {pips.map(pip => <Icon key={pip.key} name={pip.name} color={props.color} />)}
    </React.Fragment>
  );
};

CarouselPips.propTypes = {
  totalPips: PropTypes.number.isRequired,
  currentPip: PropTypes.number.isRequired,
  accumulative: PropTypes.bool,
  emptyPip: PropTypes.string,
  filledPip: PropTypes.string,
  color: PropTypes.string,
};

CarouselPips.defaultProps = {
  accumulative: false,
  emptyPip: "circle outline",
  filledPip: "circle",
  color: "grey",
};

export default CarouselPips;
