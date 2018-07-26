import React from "react";
import PropTypes from "prop-types";

import MasteriesList from "../../mastery/MasteriesList";

const UserDetailMasteries = (props) => {
  if (props.masteries.length) {
    return (
      <MasteriesList
        masteriesData={props.masteries}
        queryInfo={props.queryInfo}
      />
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
    subSubject: PropTypes.object,
  })).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailMasteries;
