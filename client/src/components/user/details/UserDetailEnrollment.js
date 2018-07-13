import React from "react";
import PropTypes from "prop-types";

const UserDetailEnrollment = (props) => {
  const { enrollment } = props.query.data.user;

  if (enrollment) {
    return (
      <div>
        <p>Enrollment ID: {enrollment.id}</p>
        <p>Enrollment createdAt: {enrollment.createdAt}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Not enrolled!</p>
      </div>
    );
  }
};

UserDetailEnrollment.propTypes = {
  query: PropTypes.shape({
    data: PropTypes.shape({
      enrollment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
      }), // Not required.
    }).isRequired,
  }).isRequired,
};

export default UserDetailEnrollment;
