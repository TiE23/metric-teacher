import React from "react";
import PropTypes from "prop-types";
import { Modal } from "semantic-ui-react";

import UserStateEditor from "./stateEditor/UserStateEditor";

const UserStateEditorModal = props => (
  <Modal
    trigger={props.children}
    size="small"
    closeIcon
  >
    <Modal.Header>Update User State</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>
          <b>ID</b>: {props.userId}
          <br />
          <b>Type</b>: {props.userType}
          <br />
          <b>Status</b>: {props.userStatus}
          <br />
          <b>Flags</b>: {props.userFlags}
        </p>
        <UserStateEditor
          userId={props.userId}
          userType={props.userType}
          userStatus={props.userStatus}
          userFlags={props.userFlags}
        />
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

UserStateEditorModal.propTypes = {
  children: PropTypes.node.isRequired,
  userId: PropTypes.string.isRequired,
  userType: PropTypes.number.isRequired,
  userStatus: PropTypes.number.isRequired,
  userFlags: PropTypes.number.isRequired,
};

export default UserStateEditorModal;
