import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
        key="login"
        as={Link}
        to="/login"
        onClick={props.navigateTo}
      >
        Sign Up / Log-in
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
