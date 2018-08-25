import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import MenuContent from "./MenuContent";

const HeaderMenu = props => (
  <Menu>
    <MenuContent
      navigateTo={props.navigateTo}
    />
  </Menu>
);

HeaderMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

export default HeaderMenu;
