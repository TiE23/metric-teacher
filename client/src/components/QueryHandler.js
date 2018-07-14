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
 *       <QueryHandler
 *        queryData={queryProps}
 *        loadingErrorProps={{ loadingMessage: "Custom Loading Message!" }}
 *       >
 *         <MyComponent queryData={queryProps} />
 *       </QueryHandler>
 *     )}
 *   </Query>
 *
 * If the Query is optional (not required to display on the page), pass the prop `skip`.
 *  When skipped it'll skip this Component (maybe you shouldn't be calling it!)
 * If the Query's success is optional, but you still want to wait, pass the prop `optional`.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const QueryHandler = (props) => {
  const { children, queryData, skip, optional } = props;

  // The query is loading or in error...
  if (!skip && (queryData.loading || (!optional && queryData.error))) {
    // Waiting for the query to load or displaying the error.
    return (
      <LoadingError
        error={queryData.error}
        {...props.loadingErrorProps}
      />
    );

  // The query has loaded and doesn't have errors, display the children
  } else {
    // Pass the queryData prop to each child.
    const childrenWithQueryData = React.Children.map(children, child =>
      React.cloneElement(child, { queryData }));
    return (
      <div>
        {childrenWithQueryData}
      </div>
    );
  }
};

QueryHandler.propTypes = {
  skip: PropTypes.bool,
  optional: PropTypes.bool,
  queryData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.any,
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

QueryHandler.defaultProps = {
  skip: false,
  optional: false,
};

export default QueryHandler;
