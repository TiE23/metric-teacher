import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Button, Grid, Header, Image, Segment } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";

const NotFoundPage = props => (
  <FloatingCenterGrid>
    <Segment raised>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="large" textAlign="center">
              Page Not Found
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Image src="/img/placeholder.png" />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <p>
              In the Internet biz we call this a <b>404 Error</b>.
            </p>
            <p>
              Hopefully we didn&apos;t send you here by mistake!
            </p>
            {props.history.length > 2 ?
              <Button onClick={props.history.goBack}>Go back</Button>
              :
              <Button onClick={() => props.history.push("/")}>Go to main page</Button>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </FloatingCenterGrid>
);

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number.isRequired,
    goBack: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NotFoundPage);
