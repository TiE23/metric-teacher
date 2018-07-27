import React from "react";
import PropTypes from "prop-types";
import { Button, Loader } from "semantic-ui-react";

const LoadingButton = (props) => {
  if (props.loading) {
    return (
      <div>
        <Loader active />
        <Button
          disabled
          {...props.buttonProps}
        >
          Loading...
        </Button>
      </div>
    );
  }

  if (props.error) {
    return (
      <Button disabled>
        Error!
      </Button>
    );
  }

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      {...props.buttonProps}
    >
      {props.buttonText}
    </Button>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,  // eslint-disable-line react/forbid-prop-types
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

LoadingButton.defaultProps = {
  error: false,
  buttonProps: null,
};

export default LoadingButton;
