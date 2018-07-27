import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import UserDetails from "./details/UserDetails";

const UserPage = props => (
  <Grid padded stackable columns="equal">
    <UserDetails
      userId={props.match.params.id === "me" ? props.userTokenData.id : props.match.params.id}
    />
    <Grid.Row>
      <Grid.Column>
        <button onClick={props.history.goBack}>Go back</button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

UserPage.propTypes = {
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

UserPage.defaultProps = {
  userTokenData: {
    id: null,
  },
};

export default withRouter(UserPage);
