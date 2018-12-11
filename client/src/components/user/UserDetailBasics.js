import React from "react";
import PropTypes from "prop-types";
import { Container, Button, Header, List, Icon } from "semantic-ui-react";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_PROFILE,
  USER_TYPE_NAMES,
  USER_STATUS_NAMES,
} from "../../constants";

const UserDetailBasics = (props) => {
  if (!props.userData) return null;

  const { userData } = props;
  const nameFormatted = [userData.honorific, userData.fname, userData.lname].join(" ").trim();

  return (
    <React.Fragment>
      <Container text>
        <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
          <Header.Content>
            <Icon name="user" color={PAGE_ICON_COLOR_PROFILE} />
            User Profile
            <Header.Subheader>
              Review your information and progress.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <List>
          <List.Item
            icon="user"
            content={nameFormatted || <i>Anonymous</i>}
          />
          <List.Item icon="mail" content={userData.email} />
          <List.Item
            icon="certificate"
            content={USER_TYPE_NAMES[userData.type] || "Unknown"}
          />
          <List.Item
            icon="shield"
            content={USER_STATUS_NAMES[userData.status] || "Unknown"}
          />
          <List.Item icon="id card" content={userData.id} />
        </List>
      </Container>
      <br />
      {typeof props.openEditor === "function" &&
        <Container textAlign="right">
          <Button
            onClick={props.openEditor}
            primary
          >
            Edit User Details
          </Button>
        </Container>
      }
      <br />
    </React.Fragment>
  );
};

UserDetailBasics.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fname: PropTypes.string,
    lname: PropTypes.string,
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
