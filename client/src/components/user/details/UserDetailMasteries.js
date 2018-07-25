import React from "react";
import PropTypes from "prop-types";

import Mastery from "../../mastery/Mastery";

const UserDetailMasteries = (props) => {
  if (props.masteries.length) {
    return (
      <div>
        <ul>
          {props.masteries.map(mastery => (
            <li key={mastery.id}>
              <Mastery masteryData={mastery} queryInfo={props.queryInfo} />
            </li>
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
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailMasteries;
