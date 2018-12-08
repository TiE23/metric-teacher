import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Header, Icon } from "semantic-ui-react";

class LoadingButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      fired: false,
    };

    this.buttonClick = (onClickFunction) => {
      onClickFunction();
      this.setState({ fired: true }); // Mark the submission as fired.
    };

    this.openModal = () => {
      this.setState({ modalOpen: true });
    };

    this.closeModal = () => {
      this.setState({
        modalOpen: false,
        fired: false, // Reset to false on close.
      });
    };

    this.componentDidUpdate = () => {
      // Actions to perform after the button has fired and is not loading.
      if (this.state.fired && !this.props.loading) {
        // If there was an error.
        if (this.props.error) {
          // Reset for another fire. How we do it depends on whether there is a modal or not.
          if (this.props.confirmModal && !this.props.modalStayOpenOnError) {
            this.closeModal();                // Close modal and reset fire.
          } else {
            this.setState({ fired: false });  // Just reset fire.
          }

        // If there was no error.
        } else {
          if (this.props.onSuccess) {
            this.props.onSuccess();  // Call onSuccess function.
          }

          // Reset for another fire. How we do it depends on whether there is a modal or not.
          if (this.props.confirmModal) {
            this.closeModal();                // Close modal and reset fire.
          } else {
            this.setState({ fired: false });  // Just reset fire.
          }
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
              disabled={this.props.error && this.props.buttonDisableOnError}
              {...this.props.buttonProps}
              onClick={this.openModal}
            >
              {(this.props.error && this.props.buttonDisableOnError) ?
                "Error!" : this.props.buttonText}
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
              color={this.props.modalRejectColor}
              onClick={this.closeModal}
            >
              <Icon name={this.props.modalRejectIcon} />
              {this.props.error ? "Close" : this.props.modalRejectLabel}
            </Button>
            {this.props.modalActions ?
              // Complex modal actions
              this.props.modalActions.map(actionProps => (
                <Button
                  key={`modalAction_${actionProps.modalAcceptLabel}`}
                  onClick={() => this.buttonClick(actionProps.modalAcceptClick)}
                  color={actionProps.modalAcceptColor}
                  basic={this.props.modalProps.basic}
                  inverted={this.props.modalProps.basic}
                  disabled={this.props.loading || (this.props.error &&
                    this.props.buttonDisableOnError && this.props.modalStayOpenOnError)}
                  loading={this.props.loading}
                >
                  {!this.props.loading && !(this.props.error && this.props.buttonDisableOnError) &&
                  <Icon name={actionProps.modalAcceptIcon} />}
                  {(this.props.error && this.props.buttonDisableOnError) ?
                    "Error!" : actionProps.modalAcceptLabel}
                </Button>
              )) :
              // Simple modal action (runs onClick)
              <Button
                onClick={() => this.buttonClick(this.props.onClick)}
                basic={this.props.modalProps.basic}
                inverted={this.props.modalProps.basic}
                color={this.props.modalAcceptColor}
                disabled={this.props.loading || (this.props.error &&
                  this.props.buttonDisableOnError && this.props.modalStayOpenOnError)}
                loading={this.props.loading}
              >
                {!this.props.loading && !(this.props.error && this.props.buttonDisableOnError) &&
                <Icon name={this.props.modalAcceptIcon} />}
                {(this.props.error && this.props.buttonDisableOnError) ?
                  "Error!" : this.props.modalAcceptLabel}
              </Button>
            }
          </Modal.Actions>
        </Modal>
      );

    // A normal loading button.
    } else {
      return (
        <Button
          onClick={() => this.buttonClick(this.props.onClick)}
          disabled={this.props.loading || (this.props.error && this.props.buttonDisableOnError)}
          loading={this.props.loading}
          {...this.props.buttonProps}
        >
          {(this.props.error && this.props.buttonDisableOnError) ? "Error!" : this.props.buttonText}
        </Button>
      );
    }
  }
}

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  onSuccess: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.any,           // eslint-disable-line react/forbid-prop-types
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  buttonDisableOnError: PropTypes.bool,
  confirmModal: PropTypes.bool,
  modalProps: PropTypes.object,   // eslint-disable-line react/forbid-prop-types
  modalHeaderProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  modalHeaderContent: PropTypes.string,
  modalContent: PropTypes.string,
  modalRejectLabel: PropTypes.string,
  modalRejectColor: PropTypes.string,
  modalRejectIcon: PropTypes.string,
  modalAcceptLabel: PropTypes.string,
  modalAcceptColor: PropTypes.string,
  modalAcceptIcon: PropTypes.string,
  modalActions: PropTypes.arrayOf(
    PropTypes.shape({
      modalAcceptClick: PropTypes.func.isRequired,
      modalAcceptLabel: PropTypes.string.isRequired,
      modalAcceptColor: PropTypes.string.isRequired,
      modalAcceptIcon: PropTypes.string.isRequired,
    }),
  ),
  modalStayOpenOnError: PropTypes.bool,
};

LoadingButton.defaultProps = {
  onClick: null,
  onSuccess: null,
  loading: false,
  error: false,
  buttonProps: null,
  buttonDisableOnError: false,
  confirmModal: false,
  modalProps: {
    basic: false,
  },
  modalHeaderProps: null,
  modalHeaderContent: "Confirm",
  modalContent: "Are you sure?",
  modalRejectLabel: "No",
  modalRejectColor: "red",
  modalRejectIcon: "remove",
  modalAcceptLabel: "Yes",
  modalAcceptColor: "green",
  modalAcceptIcon: "checkmark",
  modalActions: null,
  modalStayOpenOnError: false,
};

export default LoadingButton;
