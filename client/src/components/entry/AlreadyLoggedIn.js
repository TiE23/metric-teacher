import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AlreadyLoggedIn = props => (
  <div>
    <p>
      Hey friend! You appear to be already logged in. If you&#39;d like to sign-out first just {" "}
      <Link
        to={{ pathname: "/logout", state: { from: props.location } }}
      >
        click here
      </Link>!
    </p>
    <p>Otherwise go to the main page by {" "}
      <Link to="/" >
        clicking here
      </Link>!
    </p>
  </div>
);

AlreadyLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(AlreadyLoggedIn);
