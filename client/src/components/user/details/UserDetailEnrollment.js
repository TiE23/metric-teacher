import React from "react";
import PropTypes from "prop-types";

import UserDetailCourse from "./UserDetailCourse";

const UserDetailEnrollment = (props) => {
  const { enrollment } = props.query.data.user;

  if (enrollment) {
    return (
      <div>
        <p>Enrollment ID: {enrollment.id}</p>
        <UserDetailCourse courses={enrollment.courses} />
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
        courses: PropTypes.array,
      }), // Not required.
    }).isRequired,
  }).isRequired,
};

export default UserDetailEnrollment;
