import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Header, Icon } from "semantic-ui-react";

class LoadingButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      submitted: false,
    };

    this.closeModal = () => {
      this.setState({
        modalOpen: false,
        submitted: false, // Reset to false on close.
      });
    };

    this.openModal = () => {
      this.setState({ modalOpen: true });
    };

    this.modalConfirmSubmit = () => {
      this.props.onClick();
      this.setState({ submitted: true }); // Mark the submission as fired.
    };

    this.componentDidUpdate = () => {
      // Only close the modal if the submit has been fired, it's done loading, and no error.
      if (this.state.submitted && !this.props.loading) {
        if (!this.props.error) {
          if (this.props.afterModalSuccess) {
            this.props.afterModalSuccess();
          }
          this.closeModal();
        } else {
          this.setState({ submitted: false });
        }
      }
    };
  }

  render() {
    // Modal loading button with a reject or confirm dialog.
    if (this.props.confirmModal) {
      return (
        <Modal
          trigger={
            <Button
              disabled={this.props.error}
              {...this.props.buttonProps}
              onClick={this.openModal}
            >
              {this.props.error ? "Error!" : this.props.buttonText}
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.closeModal}
          {...this.props.modalProps}
        >
          <Header {...this.props.modalHeaderProps}>
            {this.props.modalHeaderContent}
          </Header>
          <Modal.Content>
            <p>
              {this.props.modalContent}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic={this.props.modalProps.basic}
              inverted={this.props.modalProps.basic}
              color="red"
              onClick={this.closeModal}
            >
              <Icon name="remove" /> {this.props.error ? "Close" : this.props.modalRejectLabel}
            </Button>
            <Button
              onClick={this.modalConfirmSubmit}
              basic={this.props.modalProps.basic}
              inverted={this.props.modalProps.basic}
              color="green"
              disabled={this.props.loading || this.props.error}
              loading={this.props.loading}
            >
              {!this.props.loading && !this.props.error && <Icon name="checkmark" />}
              {this.props.error ? "Error!" : this.props.modalAcceptLabel}
            </Button>
          </Modal.Actions>
        </Modal>
      );

    // A normal loading button.
    } else {
      return (
        <Button
          onClick={(e) => {
            e.preventDefault();
            this.props.onClick();
          }}
          disabled={this.props.loading || this.props.error}
          loading={this.props.loading}
          {...this.props.buttonProps}
        >
          {this.props.error ? "Error!" : this.props.buttonText}
        </Button>
      );
    }
  };
}

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  afterModalSuccess: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,           // eslint-disable-line react/forbid-prop-types
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  confirmModal: PropTypes.bool,
  modalProps: PropTypes.object,   // eslint-disable-line react/forbid-prop-types
  modalHeaderProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  modalHeaderContent: PropTypes.string,
  modalContent: PropTypes.string,
  modalRejectLabel: PropTypes.string,
  modalAcceptLabel: PropTypes.string,
};

LoadingButton.defaultProps = {
  afterModalSuccess: null,
  loading: false,
  error: false,
  buttonProps: null,
  confirmModal: false,
  modalProps: {
    basic: false,
  },
  modalHeaderProps: null,
  modalHeaderContent: "Confirm",
  modalContent: "Are you sure?",
  modalRejectLabel: "No",
  modalAcceptLabel: "Yes",
};

export default LoadingButton;
