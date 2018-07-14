import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo, compose } from "react-apollo";

import utils from "../../utils";

const Logout = (props) => {
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
    <Redirect to="/" />
  );
};

Logout.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  withApollo,
)(Logout);
