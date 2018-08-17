import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Modal, Button } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import QaReview from "../../qa/QaReview";

import {
  GET_QA_QUESTIONS_WITHOUT_STUDENT,
} from "../../../graphql/Queries";

const QuestionQaDetailsModal = props => (
  <Modal trigger={<Button>Details</Button>}>
    <Modal.Header>Question Details</Modal.Header>
    <Modal.Content>
      <Query
        query={GET_QA_QUESTIONS_WITHOUT_STUDENT}
        variables={{
          questionids: [props.questionId],
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
              queryInfo={{
                query: GET_QA_QUESTIONS_WITHOUT_STUDENT,
                variables: queryProps.variables,
              }}
            />
          </QueryHandler>
        )}
      </Query>
    </Modal.Content>
  </Modal>

);

QuestionQaDetailsModal.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionQaDetailsModal;
