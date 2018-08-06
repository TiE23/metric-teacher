import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Header, Icon } from "semantic-ui-react";

class LoadingButton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.closeModal = () => {
      this.setState({ modalOpen: false });
    };

    this.openModal = () => {
      this.setState({ modalOpen: true });
    };

    this.submit = () => {
      this.props.onClick();
      this.closeModal();
    };
  }

  render() {
    // Modal loading button with a reject or confirm dialog.
    if (this.props.confirmModal) {
      return (
        <Modal
          trigger={
            <Button
              {...this.props.buttonProps}
              onClick={this.openModal}
            >
              {this.props.buttonText}
            </Button>
          }
          open={this.state.modalOpen}
          onClose={this.closeModal}
          {...this.props.modalProps}
        >
          <Header {...this.props.headerProps}>
            {this.props.headerContent}
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
              <Icon name="remove" /> {this.props.rejectLabel}
            </Button>
            <Button
              onClick={this.submit}
              basic={this.props.modalProps.basic}
              inverted={this.props.modalProps.basic}
              color="green"
              disabled={this.props.loading || this.props.error}
            >
              {!this.props.loading && !this.props.error && <Icon name="checkmark" />}
              {this.props.loading ?  // eslint-disable-line no-nested-ternary
                "Loading..." : this.props.error ? "Error!" : this.props.acceptLabel}
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
          {...this.props.buttonProps}
        >
          {this.props.loading ?  // eslint-disable-line no-nested-ternary
            "Loading..." : this.props.error ? "Error!" : this.props.buttonText}
        </Button>
      );
    }
  };
}

LoadingButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any,           // eslint-disable-line react/forbid-prop-types
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  confirmModal: PropTypes.bool,
  modalProps: PropTypes.object,   // eslint-disable-line react/forbid-prop-types
  headerProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  headerContent: PropTypes.string,
  modalContent: PropTypes.string,
  rejectLabel: PropTypes.string,
  acceptLabel: PropTypes.string,
};

LoadingButton.defaultProps = {
  error: false,
  buttonProps: null,
  confirmModal: false,
  modalProps: {
    basic: false,
  },
  headerProps: null,
  headerContent: "Confirm",
  modalContent: "Are you sure?",
  rejectLabel: "No",
  acceptLabel: "Yes",
};

export default LoadingButton;
