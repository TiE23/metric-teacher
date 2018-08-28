import React from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

import MenuContentBasics from "./MenuContentBasics";
import MenuContentLogin from "./MenuContentLogin";

import {
  USER_TYPE_MODERATOR,
} from "../../constants";

const SidebarMenu = props => (
  <Sidebar
    animation="overlay"
    icon="labeled"
    inverted
    vertical
    visible={props.visible}
    width="thin"
    {...props.sidebarProps}
    as={Menu}
    onHide={props.handleSidebarHide}
  >
    <Menu.Item
      onClick={props.handleSidebarHide}
    >
      <Icon name="close" />
    </Menu.Item>
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
  sidebarProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SidebarMenu.defaultProps = {
  userTokenData: null,
  sidebarProps: null,
};

export default SidebarMenu;
