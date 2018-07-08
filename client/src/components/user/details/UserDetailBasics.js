import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const UserDetailBasics = (props) => {
  let enrollmentId = null;
  if (props.query.loading) enrollmentId = "Loading...";
  else if (props.query.error) enrollmentId = `Error: ${props.query.error}`;
  else enrollmentId = props.query.data.user.enrollment.id;

  return (
    <p>
      User Detail Basics.
      <span>EnrollmentID: {enrollmentId}</span>
    </p>
  );
};

UserDetailBasics.propTypes = {
  query: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
    data: PropTypes.shape({
      user: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(UserDetailBasics);
