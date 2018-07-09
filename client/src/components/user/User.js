import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import UserDetails from "./details/UserDetails";

const User = props => (
  <Grid padded>
    <Grid.Row>
      <Grid.Column>
        <UserDetails
          userid={props.match.params.id === "me" ? props.meAuthData.me.id : props.match.params.id}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

User.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  meAuthData: PropTypes.shape({
    me: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(User);
