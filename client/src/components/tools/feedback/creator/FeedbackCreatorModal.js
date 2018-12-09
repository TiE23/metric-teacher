import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import FeedbackCreator from "./FeedbackCreator";
import { QUESTION_DIFFICULTY_DROPDOWN } from "../../../../constants";

const FeedbackCreatorModal = props => (
  <Modal
    trigger={props.children}
    size="small"
    closeIcon
  >
    <Modal.Header>Question Feedback</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>
          &quot;{props.questionText}&quot;{" "}
          <br />
          <i>
            Difficulty: {QUESTION_DIFFICULTY_DROPDOWN[props.questionDifficulty].text}
          </i>
        </p>
        <FeedbackCreator
          questionId={props.questionId}
        />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

FeedbackCreatorModal.propTypes = {
  children: PropTypes.node.isRequired,
  questionId: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  questionDifficulty: PropTypes.number.isRequired,
};

export default FeedbackCreatorModal;
