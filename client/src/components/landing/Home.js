/* eslint-disable react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Container, Grid, Header, Icon, Image, Segment, Transition } from "semantic-ui-react";

import XLink from "../misc/ExternalLink";

import {
  SITE_NAME,
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_HOME,
  RANDOM_HOME_MASCOT_IMAGE,
  RANDOM_HOME_MASCOT_QUOTE,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
  USER_TYPE_MODERATOR,
  PAGE_ICON_COLOR_CHALLENGE,
  PAGE_ICON_COLOR_SUBJECTS,
  PAGE_ICON_COLOR_DOCUMENTATION,
  PAGE_ICON_COLOR_PROFILE,
  PAGE_ICON_COLOR_CREDITS,
  PAGE_ICON_COLOR_ADMIN,
  MASCOT_NAME_LONG,
} from "../../constants";

const Home = props => (
  <Container text>
    {!props.userTokenData &&
    <Redirect to="/welcome" />
    }

    <Grid stackable {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
      <Grid.Row>
        <Grid.Column>
          <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
            <Header.Content>
              <Icon name="home" color={PAGE_ICON_COLOR_HOME} />
              {SITE_NAME}
              <Header.Subheader>
                Master something new!
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Segment>
            <Container as={Link} to="/challenge">
              <Header>
                <Icon name="bolt" color={PAGE_ICON_COLOR_CHALLENGE} />
                Challenge
              </Header>
            </Container>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Container as={Link} to="/subjects">
              <Header>
                <Icon name="tasks" color={PAGE_ICON_COLOR_SUBJECTS} />
                Subjects
              </Header>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Segment>
            <Container as={Link} to="/docs">
              <Header>
                <Icon name="book" color={PAGE_ICON_COLOR_DOCUMENTATION} />
                Documentation
              </Header>
            </Container>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Container as={Link} to="/user/me">
              <Header>
                <Icon name="user" color={PAGE_ICON_COLOR_PROFILE} />
                My Profile
              </Header>
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row columns={2}>
        <Grid.Column width={8}>
          <Segment>
            <Container as={Link} to="/credits">
              <Header>
                <Icon name="users" color={PAGE_ICON_COLOR_CREDITS} />
                Credits
              </Header>
            </Container>
          </Segment>
        </Grid.Column>
        {(props.userTokenData && props.userTokenData.type >= USER_TYPE_MODERATOR) ?
          <Grid.Column width={8}>
            <Segment>
              <Container as={Link} to="/admin">
                <Header>
                  <Icon name="cog" color={PAGE_ICON_COLOR_ADMIN} />
                  Admin Tools
                </Header>
              </Container>
            </Segment>
          </Grid.Column> :
          <Grid.Column width={8}>
            <Segment>
              <Container as={Link} to="/tools">
                <Header>
                  <Icon name="cog" color={PAGE_ICON_COLOR_ADMIN} />
                  Community Tools
                </Header>
              </Container>
            </Segment>
          </Grid.Column>
        }
      </Grid.Row>

      <Grid.Row textAlign="center">
        <Grid.Column>
          <Transition animation="jiggle" duration={500} transitionOnMount>
            <Image src={RANDOM_HOME_MASCOT_IMAGE} centered size="medium" />
          </Transition>
          <Header>
            "{RANDOM_HOME_MASCOT_QUOTE}"
            <Header.Subheader>
              <i>—{MASCOT_NAME_LONG}</i>
            </Header.Subheader>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row textAlign="center">
        <Grid.Column>
          <p>
            <XLink to="https://twitter.com/MetricTeacher"><Icon name="twitter" />@MetricTeacher</XLink>
          </p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);

Home.propTypes = {
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

Home.defaultProps = {
  userTokenData: null,
};

export default Home;
