import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo, compose } from "react-apollo";

import utils from "../../utils";

const Logout = (props) => {
  const redirectPath = () => {
    const { state } = props.location;
    return (state && state.from && state.from.pathname) || "/";
  };

  // Clear out the local token.
  try {
    utils.removeTokenLocalStorage();
  } catch (e) {
    console.log(e.message); // eslint-disable-line no-console
  }

  // Clear out the Apollo cache.
  try {
    props.client.resetStore();
  } catch (e) {
    console.log(e.message); // eslint-disable-line no-console
  }

  return (
    <Redirect to={redirectPath()} />
  );
};

Logout.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default compose(
  withRouter,
  withApollo,
)(Logout);
