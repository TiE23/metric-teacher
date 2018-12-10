import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

import UserDetails from "./UserDetails";

const UserDetailsModal = props => (
  <Modal
    trigger={props.children}
    closeIcon
    size="fullscreen"
  >
    <Modal.Header>User Details</Modal.Header>
    <Modal.Content>
      <UserDetails userId={props.userId} />
      <br />
      <p>
        <Link to={`/user/${props.userId}`}>Go to account page...</Link>
      </p>
    </Modal.Content>
  </Modal>
);

UserDetailsModal.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
};

export default UserDetailsModal;
