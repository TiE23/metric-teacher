import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";

const MenuContent = props => (
  [
    <Menu.Item
      key="main"
      to="/"
      onClick={props.navigateTo}
    >
      <Icon name="bars" />
      {" "}
      Main
    </Menu.Item>,
    <Menu.Item
      key="profile"
      to="/user/me"
      onClick={props.navigateTo}
    >
      <Icon name="user" />
      {" "}
      Me
    </Menu.Item>,
  ]
);

MenuContent.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

export default MenuContent;