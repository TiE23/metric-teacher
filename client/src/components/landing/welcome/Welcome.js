/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Container, Divider, Grid, Header, Icon, Image, Responsive } from "semantic-ui-react";

import XLink from "../../misc/ExternalLink";

import SignupLoginButtons from "../../misc/SignupLoginButtons";
import Carousel from "../../misc/carousel/Carousel";

import CarouselVideos from "./CarouselVideos";

import {
  SITE_NAME,
  SITE_EMAIL_ADMIN,
  SITE_TWITTER_ACCOUNT,
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_WELCOME,
  MASCOT_NAME_LONG,
  MASCOT_NAME_SHORT,
  MOBILE_BREAKPOINT,
} from "../../../constants";

const Welcome = props => (
  <Grid padded stackable>
    {props.userTokenData && props.userTokenData.id && // Redirect immediately if logged in.
      <Redirect to="home" />
    }

    <Grid.Row>
      <Grid.Column width={8}>
        <Image src="/img/challenge/r-correct-b.gif" centered size="large" />
      </Grid.Column>

      <Grid.Column width={8} verticalAlign="middle">
        {/* Desktop */}
        <Responsive as={Container} text minWidth={MOBILE_BREAKPOINT}>
          <Header size={PAGE_TITLE_HEADER_SIZE}>
            <Header.Content>
              {SITE_NAME}
              <Header.Subheader>
                Learn the Metric System in a new, fun, and easy way!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupLoginButtons from="/home" />
        </Responsive>

        {/* Mobile */}
        <Responsive as={Container} text textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
          <Header size={PAGE_TITLE_HEADER_SIZE}>
            <Header.Content>
              {SITE_NAME}
              <Header.Subheader>
                Learn the Metric System in a new, fun, and easy way!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupLoginButtons from="/home" />
        </Responsive>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="video play" color={PAGE_ICON_COLOR_WELCOME} />
            {SITE_NAME} in Action
          </Header>
        </Divider>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
      {/* Desktop */}
      <Responsive as={Grid.Column} minWidth={MOBILE_BREAKPOINT}>
        <Carousel
          panels={CarouselVideos(1.2)}
          controlColor={PAGE_ICON_COLOR_WELCOME}
          incrementOnClick
        />
      </Responsive>

      {/* Mobile */}
      <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT - 1}>
        <Carousel
          panels={CarouselVideos(0.8)}
          controlColor={PAGE_ICON_COLOR_WELCOME}
          incrementOnClick
        />
      </Responsive>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="info circle" color={PAGE_ICON_COLOR_WELCOME} />
            Introducing {SITE_NAME}
          </Header>
        </Divider>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header>Who's behind {SITE_NAME}?</Header>
          <p>
            {SITE_NAME} is a personal project of Seattle-based web developer <b>Kyle Geib</b> and proudly features art drawn by Californian digital artist <b>Paul Emery</b>.
          </p>

          <p>
            Learn more about us and the technology behind {SITE_NAME} in our <Link to="/credits">credits page</Link>.
          </p>

          <Header>Like what you see?</Header>
          <p>
            {SITE_NAME} is a one-person project and is in active development. You can help by giving feedback through <a href={`mailto:${SITE_EMAIL_ADMIN}`}>e-mail</a> or by tweeting at <i>{MASCOT_NAME_SHORT}</i> directly at <XLink to={`https://twitter.com/${SITE_TWITTER_ACCOUNT}`}>@{SITE_TWITTER_ACCOUNT}&nbsp;<Icon name="twitter" fitted /></XLink>
          </p>

          <Header>Still on the fence?</Header>
          <p>
            Take a look at the <Link to="/intro">introduction page</Link> for a little more information — or {SITE_NAME}'s <Link to="/docs/missionstatement">mission statement</Link> for a lot more!
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={8}>
        <Image src="/img/challenge/r-correct-c.gif" centered size="large" />
      </Grid.Column>

      <Grid.Column width={8} verticalAlign="middle">
        {/* Desktop */}
        <Responsive as={Container} text minWidth={MOBILE_BREAKPOINT}>
          <Header size="large">
            <Header.Content>
              "Are you ready to learn?"
              <Header.Subheader>
                <i>—{MASCOT_NAME_LONG}</i>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Responsive>

        {/* Mobile */}
        <Responsive as={Container} text textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
          <Header size="large">
            <Header.Content>
              "Are you ready to learn?"
              <Header.Subheader>
                <i>—{MASCOT_NAME_LONG}</i>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Responsive>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Welcome.propTypes = {
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

Welcome.defaultProps = {
  userTokenData: null,
};

export default Welcome;
