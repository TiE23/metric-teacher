import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import Subjects from "./Subjects";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
  USER_TYPE_STUDENT,
} from "../../constants";

const SubjectsPage = props => (
  <Grid padded>
    <Grid.Row centered>
      <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
        <Subjects
          studentId={props.userTokenData && props.userTokenData.type === USER_TYPE_STUDENT ?
            props.userTokenData.id : null}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
        <button onClick={props.history.goBack}>Go back</button>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

SubjectsPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

SubjectsPage.defaultProps = {
  userTokenData: null,
};

export default withRouter(SubjectsPage);
