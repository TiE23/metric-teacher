import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignupLoginButtons = (props) => {
  const navigateTo = (e, { to, from }) => props.history.push(to, { from });

  return (
    <Button.Group>
      <Button
        as={Link}
        color="blue"
        to="/signup"
        from={props.from}
        onClick={navigateTo}
        {...props.buttonProps}
      >
        Sign Up
      </Button>
      <Button.Or />
      <Button
        as={Link}
        color="olive"
        to="/login"
        from={props.from}
        onClick={navigateTo}
        {...props.buttonProps}
      >
        Login
      </Button>
    </Button.Group>
  );
};

SignupLoginButtons.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  from: PropTypes.string,
  buttonProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SignupLoginButtons.defaultProps = {
  from: "/",
  buttonProps: null,
};

export default withRouter(SignupLoginButtons);
