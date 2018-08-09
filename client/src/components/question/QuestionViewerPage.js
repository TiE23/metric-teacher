import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import QueryHandler from "../QueryHandler";
import QuestionViewer from "./QuestionViewer";

import {
  GET_QA_QUESTIONS_DATA_LIMITED,
} from "../../graphql/Queries";

/**
 * This is for testing purposes right now.
 * @param props
 * @returns {*}
 * @constructor
 */
const QuestionViewerPage = (props) => {
  if (!props.match.params.questionId) {
    return (<p>You need to provide a question id!</p>);
  }

  return (
    <Query
      query={GET_QA_QUESTIONS_DATA_LIMITED}
      variables={{ questionids: [props.match.params.questionId] }}
      fetchPolicy="network-only"
    >
      {queryProps => (
        <QueryHandler
          queryData={queryProps}
          noDataErrorMessage="Question not found."
        >
          <QuestionViewer
            qaData={queryProps.data && queryProps.data.getQa && queryProps.data.getQa[0]}
            queryInfo={{ GET_QA_QUESTIONS_DATA_LIMITED, variables: queryProps.variables }}
            allowEditor
          />
        </QueryHandler>
      )}
    </Query>
  );
};

QuestionViewerPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(QuestionViewerPage);
