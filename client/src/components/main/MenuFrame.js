import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { compose } from "react-apollo";
import { Switch } from "react-router-dom";
import { Grid, Sticky } from "semantic-ui-react";

import withAuth from "../AuthHOC";

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
    };

    this.navigateTo = (e, { to }) => this.props.history.push(to);

    this.handleContextRef = contextRef => this.setState({ contextRef });
  }

  render() {
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
            <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
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
};

MenuFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userTokenData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

MenuFrame.defaultProps = {
  children: null,
  userTokenData: null,
};

export default compose(
  withRouter,
  withAuth,
)(MenuFrame);
