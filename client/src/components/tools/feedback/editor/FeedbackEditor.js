import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import FeedbackEditorForm from "./FeedbackEditorForm";

import {
  UPDATE_FEEDBACK_STATUS,
} from "../../../../graphql/Mutations";

const FeedbackEditor = props => (
  <Mutation
    mutation={UPDATE_FEEDBACK_STATUS}
  >
    {(updateFeedbackStatus, { loading, error, data }) => (
      <FeedbackEditorForm
        initFeedbackStatus={props.initFeedbackStatus}
        onSubmit={variables => updateFeedbackStatus({
          variables: { ...variables, feedbackid: props.feedbackId },
        })}
        loading={loading}
        error={error}
        success={data && data.updateFeedbackStatus && !!data.updateFeedbackStatus.id}
      />
    )}
  </Mutation>
);

FeedbackEditor.propTypes = {
  feedbackId: PropTypes.string.isRequired,
  initFeedbackStatus: PropTypes.number,
};

FeedbackEditor.defaultProps = {
  initFeedbackStatus: 0,
};

export default FeedbackEditor;
