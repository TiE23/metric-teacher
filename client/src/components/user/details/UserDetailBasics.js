import React from "react";
import PropTypes from "prop-types";

import {
  USER_TYPE_NAMES,
  USER_STATUS_NAMES,
} from "../../../constants";

const UserDetailBasics = (props) => {
  if (!props.userData) return null;

  const { userData } = props;

  return (
    <div>
      <h1>User Detail Basics.</h1>
      <ul>
        <li>Name: {userData.honorific ?
          `${userData.honorific} ` : ""}{userData.fname} {userData.lname}
        </li>
        <li>Email: {userData.email}</li>
        <li>ID: {userData.id}</li>
        <li>Type: {USER_TYPE_NAMES[userData.type] || "Unknown"}</li>
        <li>Status: {USER_STATUS_NAMES[userData.status] || "Unknown"}</li>
      </ul>
      {typeof props.openEditor === "function" &&
        <button onClick={props.openEditor}>Edit Profile</button>
      }
    </div>
  );
};

UserDetailBasics.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    honorific: PropTypes.string,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  }),
  openEditor: PropTypes.func,
};

UserDetailBasics.defaultProps = {
  userData: null,
  openEditor: null,
};

export default UserDetailBasics;
