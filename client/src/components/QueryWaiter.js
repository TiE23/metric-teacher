import React from "react";
import PropTypes from "prop-types";

import LoadingError from "./LoadingError";

/**
 * Helpful component contains the LoadingError component and should be placed as the
 * _child_ of Query and as the _parent_ of the loaded Component. It takes care of the ugly
 * looking syntax that has popped up in many places.
 * You can still control LoadingError's look with the prop loadingErrorProps, just define the
 * remaining props besides LoadingError's prop `error` in a simple object and you'll have your
 * customized component.
 * Ex:
 *   <Query query={SOME_QUERY}>
 *     {queryProps => (
 *       <QueryWaiter
 *        query={queryProps}
 *        loadingErrorProps={{ loadingMessage: "Custom Loading Message!" }}
 *       >
 *         <MyComponent query={queryProps} />
 *       </QueryWaiter>
 *     )}
 *   </Query>
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const QueryWaiter = (props) => {
  if (props.query.loading || props.query.error) {
    return (
      <LoadingError
        error={props.query.error}
        {...props.loadingErrorProps}
      />
    );
  } else {
    return (props.children);
  }
};

QueryWaiter.propTypes = {
  query: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  loadingErrorProps: PropTypes.shape({
    errorHeader: PropTypes.node,
    errorMessage: PropTypes.node,
    loadingMessage: PropTypes.string,
  }),
};

export default QueryWaiter;
