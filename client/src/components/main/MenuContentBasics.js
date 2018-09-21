import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon } from "semantic-ui-react";

const MenuContentBasics = props => (
  [
    <Menu.Item
      key="main"
      to="/"
      onClick={props.navigateTo}
    >
      <Icon name="home" />
      {" "}
      Main
    </Menu.Item>,
    props.loggedIn ?
      <Menu.Item
        key="challenge"
        to="/challenge"
        onClick={props.navigateTo}
      >
        <Icon name="bolt" />
        {" "}
        Challenge
      </Menu.Item> : null,
    <Menu.Item
      key="subjects"
      to="/subjects"
      onClick={props.navigateTo}
    >
      <Icon name="tasks" />
      {" "}
      Subjects
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
    props.showAdminLink ?
      <Menu.Item
        key="admin"
        to="/admin"
        onClick={props.navigateTo}
      >
        <Icon name="cog" />
        {" "}
        Admin
      </Menu.Item> : null,
  ]
);

MenuContentBasics.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  showAdminLink: PropTypes.bool,
};

MenuContentBasics.defaultProps = {
  loggedIn: false,
  showAdminLink: false,
};

export default MenuContentBasics;
