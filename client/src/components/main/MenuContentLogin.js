import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import SimpleConfirm from "../misc/SimpleConfirm";

const MenuContentLogin = props => (
  props.loggedIn ?
    [
      <SimpleConfirm
        key="logout"
        onConfirm={props.navigateTo}
        confirmProps={{
          header: "Logout",
          content: "Are you sure you want to log out now?",
          size: "tiny",
        }}
      >
        <Menu.Item
          to="/logout"
        >
          Logout
        </Menu.Item>
      </SimpleConfirm>,
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
