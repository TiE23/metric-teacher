import React from "react";
import PropTypes from "prop-types";

import {
  USER_TYPE_NAMES,
  USER_STATUS_NAMES,
} from "../../../constants";

const UserDetailBasics = (props) => {
  const { user } = props.query.data;
  return (
    <div>
      <h1>User Detail Basics.</h1>
      <ul>
        <li>Name: {user.honorific ? `${user.honorific} ` : ""}{user.fname} {user.lname}</li>
        <li>Email: {user.email}</li>
        <li>ID: {user.id}</li>
        <li>Type: {USER_TYPE_NAMES[user.type] || "Unknown"}</li>
        <li>Status: {USER_STATUS_NAMES[user.status] || "Unknown"}</li>
      </ul>
    </div>
  );
};

UserDetailBasics.propTypes = {
  query: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.any.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserDetailBasics;
