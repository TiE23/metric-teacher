/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { Container, Grid, Header, Icon, Image } from "semantic-ui-react";

import DocumentationContent from "../documentation/DocumentationContent";
import SignupLoginButtons from "../misc/SignupLoginButtons";
import FrameFooter from "../main/FrameFooter";

import {
  SITE_NAME,
  PAGE_TITLE_HEADER_SIZE,
  MASCOT_NAME_LONG,
} from "../../constants";

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
              Welcome to {SITE_NAME}!
              <Header.Subheader>
                The best way to learn the Metric System.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <p>
            {SITE_NAME} is a free website that will help you learn to imagine, understand, and describe objects, people, and the world using the Metric System.
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
          <Header dividing>What does it do?</Header>

          <p>
            {SITE_NAME} teaches you the Metric System in a way that will actually help you think in metric! With regular practice you will not be stuck calculating conversions in your head, instead you'll be simply thinking in metric!
          </p>

          <p>
            You want a little bit more detail? Read {SITE_NAME}'s mission statement <Link to="/docs/missionstatement">here</Link>.
          </p>

          <Header dividing>How does it work?</Header>

          <p>
            If you've ever used Duolingo you'll have an idea how to use {SITE_NAME}. Learn by answering rapid-fire conversion questions in the dynamic <b>Challenge</b> system.
          </p>

          <p>
            Choose a subject and a sub-subject like "<i>Mass - Human-scale</i>" and learn to convert your and your friends' body weights between pounds and kilograms. Choose "<i>Temperature - Weather-scale</i>" and become a master of both Fahrenheit <i>and</i> Celsius weather forecasts!
          </p>

          <p>
            By encouraging quick answering and rough conversions, {SITE_NAME} helps you develop a <i>sense</i> for the Metric System!
          </p>

          {DocumentationContent.howTo.challenges.questionTypes.content}

          <Header dividing>What can it teach me?</Header>

          <p>
            {SITE_NAME} offers instruction on <b>six</b> Subjects!
          </p>

          <Grid>
            <Grid.Row textAlign="center" centered columns="equal">
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="arrows alternate horizontal" size="huge" color="red" />
                  <Header.Content>Length</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="balance scale" size="huge" color="yellow" />
                  <Header.Content>Mass</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="cube" size="huge" color="blue" />
                  <Header.Content>Volume</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row textAlign="center" centered columns="equal">
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="thermometer three quarters" size="huge" color="orange" />
                  <Header.Content>Temperature</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="location arrow" size="huge" color="olive" />
                  <Header.Content>Velocity</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="clone outline" size="huge" color="teal" />
                  <Header.Content>Area</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            You can view all <Icon name="tasks" />Subjects <Link to="/subjects">here</Link>.
          </p>

          <p>
            You can view all <Icon name="book" />Documentation <Link to="/docs/guide">here</Link>.
          </p>

          <Header dividing>Will this involve a lot of math?</Header>

          <p>
            There's no getting around it but, yes, you will be performing conversion calculations in your head. {SITE_NAME} provides <Link to="/docs/guide/mentalmath">tips</Link> for mental math and conversion tricks for every unit. But with practice not only will you get get quick at them, you'll start to simply recognize new values.
          </p>

          <p>
            Just like you've known your entire life that <b>104°F</b> is a blisteringly hot day, you'll learn to naturally recognize that when your Australian friend tells you it's <b>40°C</b> outside on New Year's Day you'll know to <i>not</i> suggest she get the hot cocoa out but instead remind her to drink lots of water! That is the goal of {SITE_NAME}.
          </p>

          <Header dividing>I already know the Metric System! Can it teach me US units?</Header>

          <p>
            <b>Yes!</b> {SITE_NAME} can help you by teaching you the US Customary Unit system. Simply set your profile to say that you prefer the Metric System when enrolling and you'll be given questions more appropriate to your needs!
          </p>

          <p>
            So, if you're going to the United States you can use {SITE_NAME} to prepare you if you want to be able to read weather forecasts in Fahrenheit, understand distances in miles, or follow speed limit signs!
          </p>

          <p>
            If you're going to the United Kingdom you should take a moment to note that the Imperial system used in the UK has different units for volume. Imperial units for volume are <u>not</u> taught on {SITE_NAME}. Read more <Link to="/docs/uscustomary/liquid">here</Link>.
          </p>
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
          <Header dividing>Who's behind {SITE_NAME}?</Header>
          <p>
            {SITE_NAME} is a personal project of Seattle-based web developer <b>Kyle Geib</b> and features art drawn by Californian digital artist <b>Paul E</b>.
          </p>
          <p>
            Learn more about the site and us <Link to="/credits">here</Link>.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <FrameFooter />
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
