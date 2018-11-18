import React from "react";
import PropTypes from "prop-types";
import { Loader, Message, Segment } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";

/**
 * Genericized component that lets you display a simple loading or error notice. When this is
 * being used with an Apollo query the error object of that query should be made the error prop.
 * If error is not truthy then this component acts as a loading component. So, it should be used
 * in an if statement at the top of a render function, if the query is loading or in error, return
 * this component with error prop set to error.
 * @param error
 * @param errorHeader
 * @param errorMessage
 * @param loadingMessage
 * @returns {*}
 */
const LoadingError = ({ error, errorHeader, errorMessage, loadingMessage }) => (
  error ?
    <FloatingCenterGrid>
      <Message color="red">
        <Message.Content>
          <Message.Header>{errorHeader || "Error"}</Message.Header>
          {errorMessage || (error && error.message && <p>{error.message}</p>)}
        </Message.Content>
      </Message>
    </FloatingCenterGrid>
    :
    <FloatingCenterGrid>
      <Segment>
        <br />
        <Loader active>{loadingMessage || "Loading..."}</Loader>
        <br />
      </Segment>
    </FloatingCenterGrid>
);

LoadingError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  errorHeader: PropTypes.node,
  errorMessage: PropTypes.node,
  loadingMessage: PropTypes.string,
};

LoadingError.defaultProps = {
  error: false,
  errorHeader: null,
  errorMessage: null,
  loadingMessage: null,
};

export default LoadingError;
