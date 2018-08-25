import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Menu, Icon } from "semantic-ui-react";

class MenuContent extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateTo = (e, { to }) => this.props.history.push(to);
  }

  render() {
    return (
      [
        <Menu.Item
          name="main"
          key="main"
          to="/"
          onClick={this.navigateTo}
        >
          <Icon name="bars" />
          {" "}
          Main
        </Menu.Item>,
        <Menu.Item
          name="profile"
          key="profile"
          to="/user/me"
          onClick={this.navigateTo}
        >
          <Icon name="user" />
          {" "}
          Me
        </Menu.Item>,
      ]
    );
  }
}

MenuContent.propTypes = {
  history: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(MenuContent);
