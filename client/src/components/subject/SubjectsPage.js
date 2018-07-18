import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import Subjects from "./Subjects";

import {
  USER_TYPE_STUDENT,
} from "../../constants";

const SubjectsPage = props => (
  <Grid padded>
    <Grid.Row>
      <Grid.Column>
        <p>Subjects</p>
        <Subjects
          studentId={props.userTokenData && props.userTokenData.type === USER_TYPE_STUDENT &&
          props.userTokenData.id}
        />
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
