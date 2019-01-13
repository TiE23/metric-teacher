import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
} from "../constants";

const FloatingCenterGrid = (props) => {
  const { children } = props;

  return (
    <Grid padded centered>
      {React.Children.map(children, child => (
        <Grid.Row>
          <Grid.Column {...props.widths}>
            {React.cloneElement(child)}
          </Grid.Column>
        </Grid.Row>
      ))}
    </Grid>
  );
};

FloatingCenterGrid.propTypes = {
  children: PropTypes.node.isRequired,
  widths: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

FloatingCenterGrid.defaultProps = {
  widths: FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
};

export default FloatingCenterGrid;
