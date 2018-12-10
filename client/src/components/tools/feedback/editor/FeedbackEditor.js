import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../../../utils";

import FeedbackEditorForm from "./FeedbackEditorForm";

import {
  UPDATE_FEEDBACK_STATUS,
} from "../../../../graphql/Mutations";

const FeedbackEditor = props => (
  <Mutation
    mutation={UPDATE_FEEDBACK_STATUS}
    update={(cache, { data: { updateFeedbackStatus } }) => {
      // Updating cache's Feedback row if queryInfo was passed in.
      if (props.queryInfo) {
        const data = cache.readQuery(props.queryInfo);
        utils.cacheUpdateObject(data, updateFeedbackStatus.id, updateFeedbackStatus);
        cache.writeQuery({
          ...props.queryInfo,
          data,
        });
      }
    }}
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
  queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  initFeedbackStatus: PropTypes.number,
};

FeedbackEditor.defaultProps = {
  queryInfo: null,
  initFeedbackStatus: 0,
};

export default FeedbackEditor;
