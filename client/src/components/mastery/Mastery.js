import React from "react";
import PropTypes from "prop-types";
import MasteryToggle from "./MasteryToggle";

const Mastery = (props) => {
  const { masteryData } = props;
  return (
    <span>
      ----Mastery ({masteryData.id})- Status: {masteryData.status} - Score: {masteryData.score}
      <MasteryToggle
        queryInfo={props.queryInfo}
        masteryId={masteryData.id}
        masteryCurrentStatus={masteryData.status}
      />
    </span>
  );
};

Mastery.propTypes = {
  masteryData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default Mastery;
