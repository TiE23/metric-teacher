import React from "react";
import PropTypes from "prop-types";

import UserDetailCourse from "./UserDetailCourse";
import UserDetailEnroll from "./UserDetailEnroll";

const UserDetailEnrollment = (props) => {
  const { user } = props.query.data;
  const { enrollment } = props.query.data.user;

  if (enrollment) {
    return (
      <div>
        <p>Enrollment ID: {enrollment.id}</p>
        <UserDetailCourse courses={enrollment.courses} />
      </div>
    );
  } else if (user.type === 0) {
    return (
      <div>
        <p>Not enrolled!</p>
        <UserDetailEnroll studentId={user.id} />
      </div>
    );
  } else {
    return null;
  }
};

UserDetailEnrollment.propTypes = {
  query: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      enrollment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        courses: PropTypes.array,
      }), // Not required.
    }).isRequired,
  }).isRequired,
};

export default UserDetailEnrollment;
