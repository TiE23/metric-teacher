import React from "react";
import PropTypes from "prop-types";
import forEach from "lodash/forEach";

import utils from "../../utils";

const FlagLister = (props) => {
  const flagDescriptions = [];
  forEach(props.flagsDictionary, (value, key) => {
    if (props.flags & key) {
      flagDescriptions.push(`0x0${key.toString(16)}: "${utils.firstLetterCap(value)}"`);
    }
  });

  return (
    <span>
      {flagDescriptions.length ? flagDescriptions.join(", ") : "None"}
    </span>
  );
};

FlagLister.propTypes = {
  flags: PropTypes.number.isRequired,
  flagsDictionary: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default FlagLister;
