import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Switch } from "react-router-dom";
import { Grid, Sticky } from "semantic-ui-react";

import HeaderMenu from "./HeaderMenu";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
} from "../../constants";

const MenuFrame = class MenuFrame extends PureComponent {
  constructor(props) {
    super(props);

    this.navigateTo = (e, { to }) => this.props.history.push(to);
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
            <Sticky>
              <HeaderMenu
                navigateTo={this.navigateTo}
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
      </Grid>
    );
  }
};

MenuFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  history: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

MenuFrame.defaultProps = {
  children: null,
};

export default withRouter(MenuFrame);
