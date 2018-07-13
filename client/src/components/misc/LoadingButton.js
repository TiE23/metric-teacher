import React from "react";
import PropTypes from "prop-types";

const LoadingButton = (props) => {
  if (props.loading) {
    return (
      <img alt="loading" src="/img/loading.gif" />
    );
  }

  if (props.error) {
    return (
      <button disabled>
        Error!
      </button>
    );
  }

  return (
    <button onClick={(e) => {
      e.preventDefault();
      props.onClick();
    }}
    >
      {props.buttonText}
    </button>
  );
};

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,  // eslint-disable-line react/forbid-prop-types
};

export default LoadingButton;
