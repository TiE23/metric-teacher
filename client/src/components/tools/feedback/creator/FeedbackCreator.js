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
    {(submitFeedback, { loading, error, data }) => (
      <FeedbackCreatorForm
        onSubmit={variables => submitFeedback({
          variables: { ...variables, questionid: props.questionId },
        })}
        loading={loading}
        error={error}
        success={data && data.submitFeedback && !!data.submitFeedback.id}
      />
    )}
  </Mutation>
);

FeedbackCreator.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default FeedbackCreator;
