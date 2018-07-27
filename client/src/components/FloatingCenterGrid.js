import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import { FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM } from "../constants";

/**
 * This is a presentational component that puts its children into a pleasant-ish looking
 * centered grid with some basic responsiveness.
 */
const FloatingCenterGrid = (props) => {
  const { children } = props;

  return (
    <Grid padded centered columns={2}>
      {React.Children.map(children, child => (
        <Grid.Row>
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
            {React.cloneElement(child)}
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};

FloatingCenterGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FloatingCenterGrid;
