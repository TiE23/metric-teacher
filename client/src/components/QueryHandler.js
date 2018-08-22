import React from "react";
import PropTypes from "prop-types";

import utils from "../utils";

import LoadingError from "./LoadingError";

/**
 * Helpful component contains the LoadingError component and should be placed as the
 * _child_ of Query and as the _parent_ of the loaded Component. It takes care of the ugly
 * looking syntax that has popped up in many places.
 *
 * It passes the props "queryData" and "query" to every child (so don't put normal HTML elements
 * inside as children or you'll get warnings from React). queryData is the data returned by the
 * Query. And query is the gql object, which is useful for cache updates on mutations.
 *
 * Best use-case is to make the prop 'queryData' optional, set the default as "null", and at the
 * top of your child Component return null if queryData is null.
 *
 * You can still control LoadingError's look with the prop loadingErrorProps, just define the
 * remaining props besides LoadingError's prop `error` in a simple object and you'll have your
 * customized component.
 * Ex:
 *   <Query query={SOME_QUERY}>
 *     {queryProps => (
 *       <QueryHandler
 *        loadingErrorProps={{ loadingMessage: "Custom Loading Message!" }}
 *       >
 *         <MyComponent myData={queryProps.data && queryProps.data.someQuery} />
 *       </QueryHandler>
 *     )}
 *   </Query>
 *
 * If the Query is optional (not required to display on the page), pass the prop `skip`.
 *  When skipped it'll skip this Component (maybe you shouldn't be calling it!)
 * If the Query's success is optional, but you still want to wait, pass the prop `optional`.
 * If the Query can be expected to return nothing (such as an empty list of results from a search)
 *  pass the prop noDataIsAcceptable.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const QueryHandler = (props) => {
  const { children, queryData, skip, optional, noDataIsAcceptable, noDataErrorMessage } = props;

  // If the server sent an error.
  const queryError = (!optional && queryData.error);

  // If the data is empty after loading is complete we got nothing!
  const dataIsEmptyError =
    !noDataIsAcceptable && !queryData.loading && utils.isEmptyRecursive(queryData.data);

  // The query is loading or in error...
  if (!skip && (queryData.loading || queryError || dataIsEmptyError)) {
    // Waiting for the query to load or displaying the error.
    return (
      <LoadingError
        error={queryError || dataIsEmptyError}
        errorMessage={(!queryError && dataIsEmptyError && noDataErrorMessage)}
        {...props.loadingErrorProps}
      />
    );

  // The query has loaded and doesn't have errors, display the children
  } else {
    return children;
  }
};

QueryHandler.propTypes = {
  skip: PropTypes.bool,
  optional: PropTypes.bool,
  queryData: PropTypes.shape({
    data: PropTypes.bool.object,  // eslint-disable-line react/forbid-prop-types
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
  noDataIsAcceptable: PropTypes.bool,
  noDataErrorMessage: PropTypes.string,
};

QueryHandler.defaultProps = {
  skip: false,
  optional: false,
  noDataIsAcceptable: false,
  noDataErrorMessage: "No data was returned from the server.",
};

export default QueryHandler;
