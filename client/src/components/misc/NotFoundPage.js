/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Image, Segment } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_LARGE,
  PAGE_TITLE_HEADER_SIZE,
} from "../../constants";

const NotFoundPage = () => (
  <FloatingCenterGrid widths={FLOATING_CENTER_GRID_COLUMN_WIDTH_LARGE}>
    <Segment raised>
      <Grid stackable columns={2}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
              <Header.Content>
                <Icon name="warning sign" color="orange" />
                404
                <Header.Subheader>
                  Page Not Found
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Image src="/img/mascot/404.gif" size="medium" centered circular />
          </Grid.Column>
          <Grid.Column textAlign="center">
            <p>
              Hopefully you weren't sent here by mistake!
            </p>
            <Button as={Link} to="/" primary fluid>Go to front page</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </FloatingCenterGrid>
);

export default NotFoundPage;
