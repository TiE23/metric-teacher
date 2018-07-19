import React from "react";
import PropTypes from "prop-types";

import UserDetailCourse from "./UserDetailCourse";

const UserDetailEnrollmentDetails = props => (
  <div>
    <p>Enrollment ID: {props.enrollmentData.id}</p>
    <UserDetailCourse
      coursesData={props.enrollmentData.courses}
      studentId={props.enrollmentData.student.id}
      query={props.query}
    />
  </div>
);

UserDetailEnrollmentDetails.propTypes = {
  enrollmentData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.object),
    student: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetailEnrollmentDetails;
