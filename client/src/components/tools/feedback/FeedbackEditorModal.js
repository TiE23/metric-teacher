import React from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "semantic-ui-react";

import FeedbackEditor from "./editor/FeedbackEditor";

import {
  FEEDBACK_STATUS_DROPDOWN,
  FEEDBACK_TYPE_DROPDOWN,
} from "../../../constants";

const FeedbackEditorModal = props => (
  <Modal
    trigger={props.children}
    size="small"
    closeIcon
  >
    <Modal.Header>Question Feedback Editor</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>
          <b>Feedback ID</b>: {props.feedbackId}
          <br />

          <b>Status</b>: <Icon name={FEEDBACK_STATUS_DROPDOWN[props.feedbackStatus].icon} />
          {props.feedbackStatus}{" - "}
          <i>{FEEDBACK_STATUS_DROPDOWN[props.feedbackStatus].text}</i>
          <br />

          <b>Type</b>: <Icon name={FEEDBACK_TYPE_DROPDOWN[props.feedbackType].icon} />
          {props.feedbackType}{" - "}
          <i>{FEEDBACK_TYPE_DROPDOWN[props.feedbackType].text}</i>
          <br />

          <b>Description</b>: {props.feedbackText ? `"${props.feedbackText}"` : <i>None</i>}
        </p>
        <FeedbackEditor
          feedbackId={props.feedbackId}
          initFeedbackStatus={props.feedbackStatus}
        />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

FeedbackEditorModal.propTypes = {
  children: PropTypes.node.isRequired,
  feedbackId: PropTypes.string.isRequired,
  feedbackType: PropTypes.number.isRequired,
  feedbackStatus: PropTypes.number.isRequired,
  feedbackText: PropTypes.string,
};

FeedbackEditorModal.defaultProps = {
  feedbackText: null,
};

export default FeedbackEditorModal;
