import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, Menu, Sidebar } from "semantic-ui-react";

import MenuContentItems from "./MenuContentItems";
import MenuContentLogin from "./MenuContentLogin";

import {
  USER_TYPE_MODERATOR,
} from "../../constants";

const SidebarMenu = class SidebarMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.handleNavigateTo = (event, data) => {
      this.props.navigateTo(event, data);

      if (this.props.hideOnNavigate) {
        this.props.handleSidebarHide();
      }
    };
  }

  render() {
    return (
      <Sidebar
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={this.props.visible}
        width="thin"
        {...this.props.sidebarProps}
        as={Menu}
        onHide={this.props.handleSidebarHide}
      >
        <Menu.Item
          onClick={this.props.handleSidebarHide}
        >
          <Icon name="close" />
        </Menu.Item>
        <MenuContentItems
          navigateTo={this.handleNavigateTo}
          loggedIn={!!this.props.userTokenData}
          showAdminLink={
            this.props.userTokenData && this.props.userTokenData.type > USER_TYPE_MODERATOR
          }
        />
        <MenuContentLogin
          navigateTo={this.handleNavigateTo}
          loggedIn={!!this.props.userTokenData}
        />
      </Sidebar>
    );
  }
};

SidebarMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  hideOnNavigate: PropTypes.bool,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
  handleSidebarHide: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  sidebarProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SidebarMenu.defaultProps = {
  hideOnNavigate: false,
  userTokenData: null,
  sidebarProps: null,
};

export default SidebarMenu;
