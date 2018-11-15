import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Grid, Header, Icon, Image, Segment, Transition } from "semantic-ui-react";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_HOME,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
  USER_TYPE_MODERATOR,
} from "../../constants";

const Home = props => (
  <Grid stackable {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
    <Grid.Row>
      <Grid.Column>
        <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
          <Icon name="home" color={PAGE_ICON_COLOR_HOME} />
          Metric-Teacher
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column width={8}>
        <Segment>
          <Header as={Link} to="challenge">
            <Icon name="bolt" color="yellow" />
            Challenge
          </Header>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header as={Link} to="subjects">
            <Icon name="tasks" color="orange" />
            Subjects
          </Header>
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column width={8}>
        <Segment>
          <Header as={Link} to="docs">
            <Icon name="book" color="red" />
            Documentation
          </Header>
        </Segment>
      </Grid.Column>
      <Grid.Column width={8}>
        <Segment>
          <Header as={Link} to="user/me">
            <Icon name="user" color="blue" />
            User Profile
          </Header>
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={2}>
      <Grid.Column width={8}>
        <Segment>
          <Header as={Link} to="credits">
            <Icon name="users" color="teal" />
            Credits
          </Header>
        </Segment>
      </Grid.Column>
      {props.userTokenData && props.userTokenData.type >= USER_TYPE_MODERATOR &&
        <Grid.Column width={8}>
          <Segment>
            <Header as={Link} to="admin">
              <Icon name="cog" color="brown" />
              Admin
            </Header>
          </Segment>
        </Grid.Column>
      }
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Transition animation="jiggle" duration={500} transitionOnMount>
          <Image src="/img/challenge/r-correct-c.gif" centered size="medium" />
        </Transition>
      </Grid.Column>
    </Grid.Row>
  </Grid>
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
