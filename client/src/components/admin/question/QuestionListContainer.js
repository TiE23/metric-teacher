import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import {
  QUESTION_SEARCH,
} from "../../../graphql/Queries";

import QueryHandler from "../../QueryHandler";
import QuestionListTable from "./QuestionListTable";

const QuestionListContainer = props => (
  <Query
    query={QUESTION_SEARCH}
    variables={props.searchVariables}
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
  }),
};

QuestionListContainer.defaultProps = {
  searchVariables: {
    where: {  // HARD-CODED FOR NOW!
      parent: {
        parent: {
          name: "Length",
        },
        toMetric: true,
      },
    },
  },
};

export default QuestionListContainer;
