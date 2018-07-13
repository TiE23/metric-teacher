import React from "react";
import PropTypes from "prop-types";

const UserDetailMastery = (props) => {
  const { mastery } = props;
  return (
    <li>MasteryId: {mastery.id} - SubSubject Name: {mastery.subSubject.name} - Score: {mastery.score} - Status: {mastery.status}</li>
  );
};

UserDetailMastery.propTypes = {
  mastery: PropTypes.shape({
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    subSubject: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserDetailMastery;
