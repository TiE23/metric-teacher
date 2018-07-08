import React from "react";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import UserDetails from "./details/UserDetails";

const User = (props) => {
  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          <UserDetails />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default withRouter(User);
