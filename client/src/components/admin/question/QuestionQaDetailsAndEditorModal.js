import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Modal } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import QaReview from "../../qa/QaReview";
import QuestionViewer from "../../question/QuestionViewer";

import {
  GET_QA_QUESTIONS_WITHOUT_STUDENT,
  GET_QA_QUESTIONS_DATA_LIMITED,
} from "../../../graphql/Queries";

const QuestionQaDetailsAndEditorModal = (props) => {
  const query = props.editorMode ? GET_QA_QUESTIONS_DATA_LIMITED : GET_QA_QUESTIONS_WITHOUT_STUDENT;

  return (
    <Modal
      trigger={props.children}
    >
      <Modal.Header>Question Details</Modal.Header>
      <Modal.Content>
        <Query
          query={query}
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
              {props.editorMode ?
                <QuestionViewer
                  qaData={queryProps.data && queryProps.data.getQa && queryProps.data.getQa[0]}
                  queryInfo={props.queryInfo} // Pass in Questions query.
                  allowEditor
                />
                :
                <QaReview
                  qaData={queryProps.data && queryProps.data.getQa && queryProps.data.getQa[0]}
                  queryInfo={{ query, variables: queryProps.variables }}
                />
              }
            </QueryHandler>
          )}
        </Query>
      </Modal.Content>
    </Modal>
  );
}

QuestionQaDetailsAndEditorModal.propTypes = {
  questionId: PropTypes.string.isRequired,
  editorMode: PropTypes.bool,
  queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  modalProps: PropTypes.object,
  children: PropTypes.node,
};

QuestionQaDetailsAndEditorModal.defaultProps = {
  editorMode: false,
  queryInfo: null,
  modalProps: null,
  children: (<span>Open Modal</span>),
};

export default QuestionQaDetailsAndEditorModal;
