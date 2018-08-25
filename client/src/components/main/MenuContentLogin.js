import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

const MenuContentLogin = props => (
  props.loggedIn ?
    [
      <Menu.Item
        key="logout"
        to="/logout"
        onClick={props.navigateTo}
      >
        Logout
      </Menu.Item>,
    ]
    :
    [
      <Menu.Item
        key="signup"
        to="/signup"
        onClick={props.navigateTo}
      >
        Signup / Login
      </Menu.Item>,
    ]
);

MenuContentLogin.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
};

MenuContentLogin.defaultProps = {
  loggedIn: false,
};

export default MenuContentLogin;
