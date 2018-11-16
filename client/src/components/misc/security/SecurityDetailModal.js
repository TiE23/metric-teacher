import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";
import SecurityDetailText from "./SecurityDetailText";

const SecurityDetailModal = props => (
  <Modal trigger={props.children} closeIcon>
    <Modal.Header>
      A word on security...
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        {SecurityDetailText}
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

SecurityDetailModal.propTypes = {
  children: PropTypes.node,
};

SecurityDetailModal.defaultProps = {
  children: (<span>Security Details</span>),
};

export default SecurityDetailModal;
