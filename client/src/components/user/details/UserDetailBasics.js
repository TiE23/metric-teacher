import React from "react";
import PropTypes from "prop-types";

import {
  USER_TYPE_NAMES,
  USER_STATUS_NAMES,
} from "../../../constants";

const UserDetailBasics = (props) => {
  if (!props.queryData) return null;

  const { user } = props.queryData.data;
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
  queryData: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        fname: PropTypes.string.isRequired,
        lname: PropTypes.string.isRequired,
        honorific: PropTypes.string,
        type: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }),
};

UserDetailBasics.defaultProps = {
  queryData: null,
};

export default UserDetailBasics;
