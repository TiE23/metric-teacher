import React from "react";
import PropTypes from "prop-types";
import { Segment, Container, Button, Header, List } from "semantic-ui-react";

import {
  USER_TYPE_NAMES,
  USER_STATUS_NAMES,
} from "../../../constants";

const UserDetailBasics = (props) => {
  if (!props.userData) return null;

  const { userData } = props;
  const nameFormated =
    `${userData.honorific ? `${userData.honorific} ` : ""}${userData.fname} ${userData.lname}`;

  return (
    <Segment>
      <Header size="huge" textAlign="center">
        User Profile
      </Header>
      <List>
        <List.Item icon="user" content={nameFormated} />
        <List.Item icon="mail" content={userData.email} />
        <List.Item icon="certificate" content={USER_TYPE_NAMES[userData.type] || "Unknown"} />
        <List.Item icon="shield" content={USER_STATUS_NAMES[userData.status] || "Unknown"} />
        <List.Item icon="id card" content={userData.id} />
      </List>
      {typeof props.openEditor === "function" &&
        <Container textAlign="right" >
          <Button
            onClick={props.openEditor}
            primary
          >
            Edit Profile
          </Button>
        </Container>
      }
    </Segment>
  );
};

UserDetailBasics.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    honorific: PropTypes.string,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
  }),
  openEditor: PropTypes.func,
};

UserDetailBasics.defaultProps = {
  userData: null,
  openEditor: null,
};

export default UserDetailBasics;
