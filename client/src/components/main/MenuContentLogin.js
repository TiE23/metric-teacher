import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import withAuth from "../AuthHOC";

const MenuContentLogin = props => (
  props.userTokenData && props.userTokenData.id ?
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
  userTokenData: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default withAuth(MenuContentLogin);
