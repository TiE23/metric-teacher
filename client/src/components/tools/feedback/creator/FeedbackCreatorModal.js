import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import FeedbackCreator from "./FeedbackCreator";
import { QUESTION_DIFFICULTY_DROPDOWN } from "../../../../constants";

class FeedbackCreatorModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.handleOpen = () => this.setState({ modalOpen: true });
    this.handleClose = () => this.setState({ modalOpen: false });
  }

  render() {
    // const childrenWithProps = React.Children.map(this.props.children, child => (
    //   React.cloneElement(child, { onClick: this.handleOpen })
    // ));

    return (
      <Modal
        // trigger={childrenWithProps}
        trigger={<i onClick={this.handleOpen}>{this.props.children}</i>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        size="small"
        closeIcon
      >
        <Modal.Header>Feedback</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>
              &quot;{this.props.questionText}&quot;{" "}
              <br />
              <i>
                Difficulty: {QUESTION_DIFFICULTY_DROPDOWN[this.props.questionDifficulty].text}
              </i>
            </p>
            <FeedbackCreator
              questionId={this.props.questionId}
              closeForm={this.handleClose}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

FeedbackCreatorModal.propTypes = {
  children: PropTypes.node.isRequired,
  questionId: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  questionDifficulty: PropTypes.number.isRequired,
};

export default FeedbackCreatorModal;
