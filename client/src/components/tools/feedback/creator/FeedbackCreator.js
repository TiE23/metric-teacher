import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import FeedbackCreatorForm from "./FeedbackCreatorForm";

import {
  SUBMIT_FEEDBACK,
} from "../../../../graphql/Mutations";


const FeedbackCreator = props => (
  <Mutation
    mutation={SUBMIT_FEEDBACK}
  >
    {(submitFeedback, { loading, error }) => (
      <FeedbackCreatorForm
        onSubmit={variables => submitFeedback({
          variables: { ...variables, questionid: props.questionId }
        })}
        closeForm={props.closeForm}
        loading={loading}
        error={error}
      />
    )}
  </Mutation>
);

FeedbackCreator.propTypes = {
  questionId: PropTypes.string.isRequired,
  closeForm: PropTypes.func,
};

FeedbackCreator.defaultProps = {
  closeForm: null,
};

export default FeedbackCreator;
