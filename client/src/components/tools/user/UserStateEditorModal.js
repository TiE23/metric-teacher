import React from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "semantic-ui-react";

import utils from "../../../utils";

import UserStateEditor from "./stateEditor/UserStateEditor";

import {
  USER_TYPE_DROPDOWN,
  USER_STATUS_DROPDOWN,
  USER_FLAG_DROPDOWN,
} from "../../../constants";

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
          <b>Type</b>: <Icon name={USER_TYPE_DROPDOWN[props.userType].icon} />
          {props.userType} - <i>{USER_TYPE_DROPDOWN[props.userType].text}</i>
          <br />
          <b>Status</b>: <Icon name={USER_STATUS_DROPDOWN[props.userStatus].icon} />
          {props.userStatus} - <i>{USER_STATUS_DROPDOWN[props.userStatus].text}</i>
          <br />
          <b>Flags</b>: <Icon name={props.userFlags === 0 ? "flag outline" : "flag"} />
          {props.userFlags} -  <i>{utils.flagDescriber(USER_FLAG_DROPDOWN, props.userFlags)}</i>
        </p>
        <UserStateEditor
          userId={props.userId}
          userType={props.userType}
          userStatus={props.userStatus}
          userFlags={props.userFlags}
          queryInfo={props.queryInfo}
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
  queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

UserStateEditorModal.defaultProps = {
  queryInfo: null,
};

export default UserStateEditorModal;
