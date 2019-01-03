/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Accordion, Container, Grid, Header, Icon, Image } from "semantic-ui-react";

import XLink from "../../misc/ExternalLink";

import SignupLoginButtons from "../../misc/SignupLoginButtons";
import WelcomeText from "./WelcomeText";

import {
  SITE_NAME,
  PAGE_TITLE_HEADER_SIZE,
  MASCOT_NAME_LONG,
} from "../../../constants";

const Welcome = props => (
  <Grid padded>
    {props.userTokenData && props.userTokenData.id && // Redirect immediately if logged in.
      <Redirect to="home" />
    }

    <Grid.Row>
      <Grid.Column>
        <Image src="/img/challenge/r-correct-a.gif" centered size="large" />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
            <Header.Content>
              {SITE_NAME}
              <Header.Subheader>
                A new way to learn the Metric System.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <p>
            Welcome! {SITE_NAME} is a free website that will help you learn to understand, describe, and imagine objects, people, and the world using the Metric System. Read our mission statement <Link to="/docs/missionstatement">here</Link>.
          </p>

          <p>
            <i>{SITE_NAME} is brand new and is in active development. Please have patience as we figure everything out. You can help by sending feedback by contacting us <XLink to="https://twitter.com/MetricTeacher">@MetricTeacher&nbsp;<Icon name="twitter" fitted /></XLink> or sending an <a href="mailto:metricteachersite@gmail.com">email</a>!</i>
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
      <Grid.Column>
        <Header>
          Start learning on {SITE_NAME} today!
        </Header>
        <SignupLoginButtons from="/home" />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Accordion
            panels={WelcomeText}
            exclusive={false}
            defaultActiveIndex={[0]}
            fluid
          />
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
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
          <Image src="/img/challenge/r-correct-b.gif" centered size="large" />
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
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
            Learn more about us and the technology behind {SITE_NAME} <Link to="/credits">here</Link>.
          </p>
        </Container>
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
