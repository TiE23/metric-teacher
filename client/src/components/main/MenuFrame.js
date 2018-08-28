import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { compose } from "react-apollo";
import { Switch } from "react-router-dom";
import { Button, Icon, Grid, Sticky, Responsive } from "semantic-ui-react";

import withAuth from "../AuthHOC";

import SidebarMenu from "./SidebarMenu";
import HeaderMenu from "./HeaderMenu";
import FrameFooter from "./FrameFooter";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
} from "../../constants";

const MenuFrame = class MenuFrame extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contextRef: null,
      sidebarVisible: false,
    };

    this.navigateTo = (e, { to }) => this.props.history.push(to);

    this.handleButtonClick = () => this.setState(prevState => (
      { sidebarVisible: !prevState.sidebarVisible }
    ));

    this.handleSidebarHide = () => this.setState({ sidebarVisible: false });

    this.handleContextRef = contextRef => this.setState({ contextRef });
  }

  render() {
    if (true) {
      return (
        <div ref={this.handleContextRef}>
          <Grid>
            <Grid.Row>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
                <Sticky context={this.state.contextRef}>
                  <Responsive as="div" {...Responsive.onlyMobile}>
                    <Button
                      icon
                      onClick={this.handleButtonClick}
                    >
                      <Icon name="bars" />
                    </Button>
                    <SidebarMenu
                      navigateTo={this.navigateTo}
                      userTokenData={this.props.userTokenData}
                      handleSidebarHide={this.handleSidebarHide}
                      visible={this.state.sidebarVisible}
                    />
                  </Responsive>
                  <Responsive
                    as={HeaderMenu}
                    navigateTo={this.navigateTo}
                    userTokenData={this.props.userTokenData}
                    minWidth={Responsive.onlyTablet.minWidth}
                  />
                </Sticky>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column {...this.props.contentWidth}>
                <Switch>
                  {this.props.children}
                </Switch>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
                <FrameFooter />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    } else {
      // Keep this here for now.
      return (
        <div ref={this.handleContextRef}>
          <Grid>
            <Grid.Row>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
                <Sticky context={this.state.contextRef}>
                  <HeaderMenu
                    navigateTo={this.navigateTo}
                    userTokenData={this.props.userTokenData}
                  />
                </Sticky>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column {...this.props.contentWidth}>
                <Switch>
                  {this.props.children}
                </Switch>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
                <FrameFooter />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
  }
};

MenuFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userTokenData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  contentWidth: PropTypes.shape({
    mobile: PropTypes.number.isRequired,
    tablet: PropTypes.number.isRequired,
    computer: PropTypes.number.isRequired,
  }),
};

MenuFrame.defaultProps = {
  children: null,
  userTokenData: null,
  contentWidth: FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
};

export default compose(
  withRouter,
  withAuth,
)(MenuFrame);
