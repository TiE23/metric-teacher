import React from "react";
import PropTypes from "prop-types";

import UserDetailMastery from "./UserDetailMastery";

const UserDetailMasteries = (props) => {
  if (props.masteries.length) {
    return (
      <div>
        <ul>
          {props.masteries.map(mastery => (
            <UserDetailMastery key={mastery.id} mastery={mastery} />
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <p>No masteries!</p>
      </div>
    );
  }
};

UserDetailMasteries.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default UserDetailMasteries;
