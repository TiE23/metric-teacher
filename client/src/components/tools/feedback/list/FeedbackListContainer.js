import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../../QueryHandler";
import FeedbackListTable from "./FeedbackListTable";

const FeedbackListContainer = props => (
  <Query
    query={props.query}
    variables={props.searchVariables}
    fetchPolicy="network-only"  // Fresh data on every search.
  >
    {queryProps => (
      <QueryHandler
        queryData={queryProps}
        noDataIsAcceptable
      >
        <FeedbackListTable
          feedbackData={queryProps.data.feedbackSearch}
          queryInfo={{ query: props.query, variables: queryProps.variables }}
          adminMode={props.adminMode}
        />
      </QueryHandler>
    )}
  </Query>
);

FeedbackListContainer.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchVariables: PropTypes.shape({
    where: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  adminMode: PropTypes.bool,
};

FeedbackListContainer.defaultProps = {
  adminMode: false,
};

export default FeedbackListContainer;
