import React from "react";
import PropTypes from "prop-types";
import { Grid, Header } from "semantic-ui-react";

const QuestionEdit = props => (
  <Grid columns="equal" padded>
    <Grid.Row>
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>Basic Details</Header>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

QuestionEdit.propTypes = {

};

export default QuestionEdit;
