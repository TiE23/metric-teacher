import React from "react";
import PropTypes from "prop-types";
import { Menu, Sidebar } from "semantic-ui-react";

import MenuContentBasics from "./MenuContentBasics";
import MenuContentLogin from "./MenuContentLogin";

import {
  USER_TYPE_MODERATOR,
} from "../../constants";

const SidebarMenu = props => (
  <Sidebar
    as={Menu}
    animation="push"
    icon="labeled"
    inverted
    onHide={props.handleSidebarHide}
    vertical
    visible={props.visible}
    width="thin"
  >
    <MenuContentBasics
      navigateTo={props.navigateTo}
      loggedIn={!!props.userTokenData}
      showAdminLink={props.userTokenData && props.userTokenData.type > USER_TYPE_MODERATOR}
    />
    <MenuContentLogin
      navigateTo={props.navigateTo}
      loggedIn={!!props.userTokenData}
    />
  </Sidebar>
);

SidebarMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
  handleSidebarHide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

SidebarMenu.defaultProps = {
  userTokenData: null,
};

export default SidebarMenu;
