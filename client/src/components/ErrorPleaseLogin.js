import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

/**
 * Simple component checks incoming error prop for a message with an indicator that tells the
 * component the error is due to the user not being logged in. It'll provide links to the login and
 * signup pages including the Link prop state.from to let the user to automatically be returned to
 * the page they found this error at through the use of the withRouter enhancer.
 * >>Use this as the error prop of the LoadingError component.<<
 * @param props
 * @returns {*}
 * @constructor
 */
const ErrorPleaseLogin = props => (
  <div>
    {props.error &&
      <p>
        {props.error.message || "There was an error."}
      </p>
    }

    {(props.showLoginLinks || (props.error && props.error.message.includes("User must be logged in"))) &&
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
  showLoginLinks: PropTypes.bool,
  location: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

ErrorPleaseLogin.defaultProps = {
  error: null,
  showLoginLinks: false,
};

export default withRouter(ErrorPleaseLogin);
