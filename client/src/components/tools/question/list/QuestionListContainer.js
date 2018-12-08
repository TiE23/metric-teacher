import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../../QueryHandler";
import QuestionListTable from "./QuestionListTable";

import {
  QUESTION_SEARCH,
} from "../../../../graphql/Queries";

const QuestionListContainer = props => (
  <Query
    query={QUESTION_SEARCH}
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
          queryInfo={{ query: QUESTION_SEARCH, variables: queryProps.variables }}
        />
      </QueryHandler>
    )}
  </Query>
);

QuestionListContainer.propTypes = {
  searchVariables: PropTypes.shape({
    where: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
};

export default QuestionListContainer;
