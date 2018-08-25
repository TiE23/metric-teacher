import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { Grid, Sticky } from "semantic-ui-react";
import HeaderMenu from "./HeaderMenu";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
} from "../../constants";

const MenuFrame = props => (
  <Grid>
    <Grid.Row>
      <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
        <Sticky>
          <HeaderMenu />
        </Sticky>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
        <Switch>
          {props.children}
        </Switch>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

MenuFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

MenuFrame.defaultProps = {
  children: null,
};

export default MenuFrame;
