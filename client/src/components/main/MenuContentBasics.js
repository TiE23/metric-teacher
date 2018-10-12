import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

const MenuContentBasics = props => (
  [
    <Menu.Item
      key="main"
      as={Link}
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
        as={Link}
        to="/challenge"
        onClick={props.navigateTo}
      >
        <Icon name="bolt" />
        {" "}
        Challenge
      </Menu.Item> : null,
    <Menu.Item
      key="subjects"
      as={Link}
      to="/subjects"
      onClick={props.navigateTo}
    >
      <Icon name="tasks" />
      {" "}
      Subjects
    </Menu.Item>,
    <Menu.Item
      key="docs"
      as={Link}
      to="/docs"
      onClick={props.navigateTo}
    >
      <Icon name="book" />
      {" "}
      Docs
    </Menu.Item>,
    props.loggedIn ?
      <Menu.Item
        key="profile"
        as={Link}
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
        as={Link}
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
