import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

import {
  PAGE_ICON_COLOR_ADMIN,
  PAGE_ICON_COLOR_CHALLENGE,
  PAGE_ICON_COLOR_DOCUMENTATION,
  PAGE_ICON_COLOR_HOME,
  PAGE_ICON_COLOR_PROFILE,
  PAGE_ICON_COLOR_SUBJECTS,
} from "../../constants";

const MenuContentItems = props => (
  [
    <Menu.Item
      key="home"
      as={Link}
      to="/"
      onClick={props.navigateTo}
    >
      <Icon name="home" color={PAGE_ICON_COLOR_HOME} />
      {" "}
      Home
    </Menu.Item>,
    props.loggedIn ?
      <Menu.Item
        key="challenge"
        as={Link}
        to="/challenge"
        onClick={props.navigateTo}
      >
        <Icon name="bolt" color={PAGE_ICON_COLOR_CHALLENGE} />
        {" "}
        Challenge
      </Menu.Item> : null,
    <Menu.Item
      key="subjects"
      as={Link}
      to="/subjects"
      onClick={props.navigateTo}
    >
      <Icon name="tasks" color={PAGE_ICON_COLOR_SUBJECTS} />
      {" "}
      Subjects
    </Menu.Item>,
    <Menu.Item
      key="docs"
      as={Link}
      to="/docs"
      onClick={props.navigateTo}
    >
      <Icon name="book" color={PAGE_ICON_COLOR_DOCUMENTATION} />
      {" "}
      Docs
    </Menu.Item>,
    (props.loggedIn && !props.showAdminLink) ?
      <Menu.Item
        key="profile"
        as={Link}
        to="/user/me"
        onClick={props.navigateTo}
      >
        <Icon name="user" color={PAGE_ICON_COLOR_PROFILE} />
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
        <Icon name="cog" color={PAGE_ICON_COLOR_ADMIN} />
        {" "}
        Admin
      </Menu.Item> : null,
  ]
);

MenuContentItems.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  showAdminLink: PropTypes.bool,
};

MenuContentItems.defaultProps = {
  loggedIn: false,
  showAdminLink: false,
};

export default MenuContentItems;
