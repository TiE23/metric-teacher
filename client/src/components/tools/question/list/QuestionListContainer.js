import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../../QueryHandler";
import QuestionListTable from "./QuestionListTable";

const QuestionListContainer = props => (
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
        <QuestionListTable
          questionData={queryProps.data.questionSearch}
          queryInfo={{ query: props.query, variables: queryProps.variables }}
        />
      </QueryHandler>
    )}
  </Query>
);

QuestionListContainer.propTypes = {
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  searchVariables: PropTypes.shape({
    where: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
};

export default QuestionListContainer;
