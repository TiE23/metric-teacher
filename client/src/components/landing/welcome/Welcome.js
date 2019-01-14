/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Container, Divider, Grid, Header, Icon, Image, Responsive } from "semantic-ui-react";

import XLink from "../../misc/ExternalLink";
import ScrollToTopOnMount from "../../misc/ScrollToTopOnMount";

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
    <ScrollToTopOnMount />
    {props.userTokenData && props.userTokenData.id && // Redirect immediately if logged in.
      <Redirect to="/home" />
    }

    {/* Desktop */}
    <Responsive as={Grid.Row} minWidth={MOBILE_BREAKPOINT} columns="equal">
      <Grid.Column>
        <Image src="/img/challenge/r-correct-b.gif" size="large" floated="right" />
      </Grid.Column>
      <Grid.Column>
        <Container text>
          <Header size={PAGE_TITLE_HEADER_SIZE}>
            <Header.Content>
              {SITE_NAME}
              <Header.Subheader>
                Learn the Metric System in a new, fun,<br />and easy way!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Responsive>

    {/* Mobile */}
    <Responsive as={Grid.Row} textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
      <Grid.Column>
        <Image src="/img/challenge/r-correct-b.gif" size="large" centered />
      </Grid.Column>
    </Responsive>
    <Responsive as={Grid.Row} textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
      <Grid.Column>
        <Container text>
          <Header size={PAGE_TITLE_HEADER_SIZE}>
            <Header.Content>
              {SITE_NAME}
              <Header.Subheader>
                Learn the Metric System in a new, fun, and easy way!
              </Header.Subheader>
            </Header.Content>
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Responsive>

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
          wrapping
        />
      </Responsive>

      {/* Mobile */}
      <Responsive as={Grid.Column} maxWidth={MOBILE_BREAKPOINT - 1}>
        <Carousel
          panels={CarouselVideos(0.8)}
          controlColor={PAGE_ICON_COLOR_WELCOME}
          incrementOnClick
          wrapping
        />
      </Responsive>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="info circle" color={PAGE_ICON_COLOR_WELCOME} />
            Get to Know {SITE_NAME}
          </Header>
        </Divider>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header>Want to learn a little more?</Header>
          <p>
            Take a look at the <Link to="/intro">introduction page</Link> for a little more information — or {SITE_NAME}'s <Link to="/docs/1/missionstatement">mission statement</Link> for a lot more!
          </p>

          <Header>Already know the Metric System?</Header>
          <p>
            {SITE_NAME} also works in reverse, teaching Metric System users the US Customary Unit System. Simply set your preference when Enrolling!
          </p>

          <Header>Who's behind {SITE_NAME}?</Header>
          <p>
            {SITE_NAME} is a personal project of Seattle-based web developer <b>Kyle Geib</b> and proudly features art drawn by Californian digital artist <b>Paul Emery</b>.
          </p>

          <p>
            Learn more about us and the technology behind {SITE_NAME} in our <Link to="/credits">credits page</Link>.
          </p>

          <p>
            {SITE_NAME} is a one-person project and is in active development. You can help by giving feedback through <a href={`mailto:${SITE_EMAIL_ADMIN}`}>e-mail</a> or by tweeting directly at <i>{MASCOT_NAME_SHORT}</i> at <XLink to={`https://twitter.com/${SITE_TWITTER_ACCOUNT}`}>@{SITE_TWITTER_ACCOUNT}&nbsp;<Icon name="twitter" fitted /></XLink>
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="check circle" color={PAGE_ICON_COLOR_WELCOME} />
            {SITE_NAME} is Ready For You
          </Header>
        </Divider>
      </Grid.Column>
    </Grid.Row>

    {/* Desktop */}
    <Responsive as={Grid.Row} minWidth={MOBILE_BREAKPOINT} columns="equal">
      <Grid.Column>
        <Image src="/img/challenge/r-correct-c.gif" size="large" floated="right" />
      </Grid.Column>
      <Grid.Column>
        <Container text>
          <Header size="large">
            <Header.Content>
              "So, are you ready to learn?"
              <Header.Subheader>
                <i>—{MASCOT_NAME_LONG}</i>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Responsive>

    {/* Mobile */}
    <Responsive as={Grid.Row} textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
      <Grid.Column>
        <Image src="/img/challenge/r-correct-c.gif" size="large" centered />
      </Grid.Column>
    </Responsive>
    <Responsive as={Grid.Row} textAlign="center" maxWidth={MOBILE_BREAKPOINT - 1}>
      <Grid.Column>
        <Container text>
          <Header size="large">
            <Header.Content>
              "So, are you ready to learn?"
              <Header.Subheader>
                <i>—{MASCOT_NAME_LONG}</i>
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Responsive>
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
