import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import MenuContent from "./MenuContent";
import MenuContentLogin from "./MenuContentLogin";

const HeaderMenu = props => (
  <Menu>
    <MenuContent
      navigateTo={props.navigateTo}
    />
    <Menu.Menu position="right">
      <MenuContentLogin
        navigateTo={props.navigateTo}
      />
    </Menu.Menu>
  </Menu>
);

HeaderMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

export default HeaderMenu;
