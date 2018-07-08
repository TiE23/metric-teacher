import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const UserDetailBasics = (props) => {
  let enrollmentId = null;
  if (props.query.loading) enrollmentId = "Loading...";
  else if (props.query.error) enrollmentId = `Error: ${props.query.error}`;
  else enrollmentId = props.query.data.me.enrollment.id;

  return (
    <p>
      User Detail Basics.
      <span>EnrollmentID: {enrollmentId}</span>
    </p>
  );
};

UserDetailBasics.propTypes = {
  query: PropTypes.object.isRequired,
};

export default withRouter(UserDetailBasics);
