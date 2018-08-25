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
    props.loggedIn ?
      <Menu.Item
        key="profile"
        to="/user/me"
        onClick={props.navigateTo}
      >
        <Icon name="user" />
        {" "}
        Me
      </Menu.Item> : null,
  ]
);

MenuContent.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
};

MenuContent.defaultProps = {
  loggedIn: false,
};

export default MenuContent;
