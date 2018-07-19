import React from "react";
import PropTypes from "prop-types";

const Mastery = (props) => {
  const { masteryData } = props;
  return (
    <span>
      ----Mastery ({masteryData.id})- Status: {masteryData.status} - Score: {masteryData.score}
    </span>
  );
};

Mastery.propTypes = {
  masteryData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};

export default Mastery;
