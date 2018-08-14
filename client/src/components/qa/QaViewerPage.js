import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withRouter } from "react-router";

import QueryHandler from "../QueryHandler";
import QaReview from "./QaReview";

import {
  GET_QA_QUESTIONS_WITH_STUDENT,
  GET_QA_QUESTIONS_WITHOUT_STUDENT,
} from "../../graphql/Queries";

import {
  USER_TYPE_STUDENT,
} from "../../constants";

/**
 * This is for testing purposes right now.
 * @param props
 * @returns {*}
 * @constructor
 */
const QaViewerPage = (props) => {
  if (!props.match.params.questionId) {
    return (<p>You need to provide a question id!</p>);
  }

  if(!props.userTokenData) {
    return (<p>Must be logged in!</p>);
  }

  const query = props.userTokenData && props.userTokenData.type === USER_TYPE_STUDENT ?
    GET_QA_QUESTIONS_WITH_STUDENT : GET_QA_QUESTIONS_WITHOUT_STUDENT;

  // Right now this is only viewable by logged in users.
  if (props.userTokenData && props.userTokenData.id) {
    return (
      <Query
        query={query}
        variables={{
          questionids: [props.match.params.questionId],
          studentid: props.userTokenData && props.userTokenData.id,
        }}
        fetchPolicy="network-only"
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
            noDataErrorMessage="Question not found."
          >
            <QaReview
              qaData={queryProps.data && queryProps.data.getQa && queryProps.data.getQa[0]}
              queryInfo={{ query, variables: queryProps.variables }}
              studentId={queryProps.variables.studentid}
            />
          </QueryHandler>
        )}
      </Query>
    );
  }
};

QaViewerPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      questionId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

QaViewerPage.defaultProps = {
  userTokenData: null,
};

export default withRouter(QaViewerPage);
