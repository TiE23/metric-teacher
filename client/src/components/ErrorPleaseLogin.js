import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const ErrorPleaseLogin = props => (
  <div>
    <p>
      {(props.error && props.error.message) || "There was a problem..."}
    </p>

    {props.error && props.error.message.includes("User must be logged in") &&
    <p>
      Please <Link to={{ pathname: "/login", state: { from: props.location } }}>login</Link> {" "}
      or <Link to={{ pathname: "/signup", state: { from: props.location } }}>sign-up</Link>.
    </p>
    }
    <button onClick={props.history.goBack}>Go back</button>
  </div>
);

ErrorPleaseLogin.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  location: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

ErrorPleaseLogin.defaultProps = {
  error: null,
};

export default withRouter(ErrorPleaseLogin);
