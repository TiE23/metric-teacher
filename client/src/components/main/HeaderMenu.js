import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

import MenuContentItems from "./MenuContentItems";
import MenuContentLogin from "./MenuContentLogin";

import {
  USER_TYPE_MODERATOR,
} from "../../constants";

const HeaderMenu = props => (
  <Menu>
    <MenuContentItems
      navigateTo={props.navigateTo}
      loggedIn={!!props.userTokenData}
      showAdminLink={props.userTokenData && props.userTokenData.type > USER_TYPE_MODERATOR}
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
    type: PropTypes.number.isRequired,
  }),
};

HeaderMenu.defaultProps = {
  userTokenData: null,
};

export default HeaderMenu;
