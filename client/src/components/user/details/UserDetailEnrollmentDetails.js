import React from "react";
import PropTypes from "prop-types";

import UserDetailCourse from "./UserDetailCourse";

const UserDetailEnrollmentDetails = props => (
  <div>
    <p>Enrollment ID: {props.enrollmentData.id}</p>
    <UserDetailCourse
      coursesData={props.enrollmentData.courses}
      studentId={props.enrollmentData.student.id}
      queryInfo={props.queryInfo}
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
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailEnrollmentDetails;
