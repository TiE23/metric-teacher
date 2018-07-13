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
          userid={props.match.params.id === "me" ? props.userTokenData.id : props.match.params.id}
        />
        <button onClick={props.history.goBack}>Go back</button>
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
  userTokenData: PropTypes.shape({
    id: PropTypes.string,
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

User.defaultProps = {
  userTokenData: {
    id: null,
  },
};

export default withRouter(User);
