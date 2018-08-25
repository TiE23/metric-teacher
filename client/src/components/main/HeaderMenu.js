import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import MenuContentBasics from "./MenuContentBasics";
import MenuContentLogin from "./MenuContentLogin";

const HeaderMenu = props => (
  <Menu>
    <MenuContentBasics
      navigateTo={props.navigateTo}
      loggedIn={!!props.userTokenData}
    />
    <Menu.Menu position="right">
      <MenuContentLogin
        navigateTo={props.navigateTo}
        loggedIn={!!props.userTokenData}
      />
    </Menu.Menu>
  </Menu>
);

HeaderMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

HeaderMenu.defaultProps = {
  userTokenData: null,
};

export default HeaderMenu;
