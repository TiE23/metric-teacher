/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Container, Grid, Header, Icon, Image, List } from "semantic-ui-react";

import SignupLoginButtons from "../misc/SignupLoginButtons";
import XLink from "../misc/ExternalLink";
import FrameFooter from "../main/FrameFooter";
import {
  WELCOME_PAGE_QUESTIONS_WIDTH,
  WELCOME_PAGE_SUBJECTS_WIDTH,
} from "../../constants";

// TODO - Redirect to /home when logged-in.
const Welcome = () => (
  <Grid padded>
    <Grid.Row>
      <Grid.Column>
        <Image src="/img/challenge/r-correct-a.gif" centered size="big" />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Header size="huge" textAlign="center">
          Welcome to Metric-Teacher!
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <p>
            Metric-Teacher is a free website that will help you learn to imagine, understand, and describe objects, people, and the world in the Metric System.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
      <Grid.Column>
        <Header>
          Start learning on Metric-Teacher today!
        </Header>
        <SignupLoginButtons from="/home" />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            What does it do?
          </Header>

          <p>
            Metric-Teacher teaches you the Metric system in a way that will actually help you think in Metric! With regular practice you will not be stuck calculating conversions in your head, instead you'll be simply thinking in Metric!
          </p>

          <p>
            You want a little bit more detail? Read Metric-Teacher's mission statement <Link to="docs/missionstatement">here</Link>.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            How does it work?
          </Header>

          <p>
            If you've ever used Duolingo, you'll have an idea how to use Metric-Teacher. By choosing your desired subject to be quizzed on you'll learn by getting asked and answering questions in a dynamic <b>Challenge</b> system!
          </p>

          <p>
            <b>Challenges</b> use three different types of questions to help you learn...
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered columns={3} divided>
      <Grid.Column {...WELCOME_PAGE_QUESTIONS_WIDTH}>
        <Image src="/img/challenge/m-written.gif" size="small" rounded centered />
        <Header textAlign="center">Written</Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_QUESTIONS_WIDTH}>
        <Image src="/img/challenge/m-conversion.gif" size="small" rounded centered />
        <Header textAlign="center">Conversion</Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_QUESTIONS_WIDTH}>
        <Image src="/img/challenge/m-survey.gif" size="small" rounded centered />
        <Header textAlign="center">Survey</Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <List>
            <List.Item>
              <b>Written</b> questions are multiple-choice. They range from simple facts about units to the measurements of real-world objects, people, locations, records, and more!
            </List.Item>
            <List.Item>
              <b>Conversion</b> questions are dynamically generated. They ask you to convert one measurement to another. There are multiple methods of answering including multiple choice, slider bar, and direct input!
            </List.Item>
            <List.Item>
              <b>Survey</b> questions are special to Metric-Teacher. Surveys ask you to give factual and opinion-based answers to questions ranging from your own height to your preferred room temperature. Metric-Teacher will then teach you these values in Metric by asking you to convert these personalized questions!
            </List.Item>
          </List>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            What can it teach me?
          </Header>

          <p>
            Metric-Teacher offers instruction on <b>six</b> major Subjects!
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center" centered columns={3}>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="arrows alternate horizontal" size="huge" color="red" />
          <Header.Content>Length</Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="balance scale" size="huge" color="yellow" />
          <Header.Content>Mass</Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="cube" size="huge" color="blue" />
          <Header.Content>Volume</Header.Content>
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center" centered columns={3}>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="thermometer three quarters" size="huge" color="orange" />
          <Header.Content>Temperature</Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="location arrow" size="huge" color="olive" />
          <Header.Content>Velocity</Header.Content>
        </Header>
      </Grid.Column>
      <Grid.Column {...WELCOME_PAGE_SUBJECTS_WIDTH}>
        <Header icon textAlign="center">
          <Icon name="clone outline" size="huge" color="teal" />
          <Header.Content>Area</Header.Content>
        </Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <p>
            You can view all <Icon name="tasks" />Subjects <Link to="subjects">here</Link>.
          </p>

          <p>
            You can view all <Icon name="book" />Documentation <Link to="docs">here</Link>.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            Will this involve doing math?
          </Header>

          <p>
            There's no getting around it but, yes, you will be performing conversions. But with practice not only will you get get quick at them, you'll start to simply recognize new values.
          </p>

          <p>
            Just like you've known your entire life that <b>104°F</b> is a blisteringly hot day, you'll learn to naturally recognize that when your Australian friend tells you it's <b>40°C</b> in her town on New Year's Day you'll know to tell her to drink lots of water and <i>not</i> break out the hot cocoa. That is the goal of Metric-Teacher.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            But I already know the Metric system! Can it teach me US units?
          </Header>

          <p>
            <b>Yes!</b> Metric-Teacher can help you by teaching you the US Customary Unit system. Simply set your profile to say that you prefer the Metric system when enrolling and you'll be given questions more appropriate to your needs!
          </p>

          <p>
            So, if you're going to the United States you can use Metric-Teacher to prepare you if you want to be able to read weather forecasts in Fahrenheit, understand distances in miles, or follow speed limit signs!
          </p>

          <p>
            If you're going to the United Kingdom instead, you should take a moment to note that differences in the Imperial system used in the UK exist for volume and are not taught on Metric-Teacher. Read more <Link to="docs/uscustomary/liquid">here</Link>.
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
                —Meti, The Metric Macaw
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Image src="/img/challenge/r-correct-b.gif" centered size="large" />
          <Header size="small">
            Start learning on Metric-Teacher today!
          </Header>
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            Who's behind Metric-Teacher?
          </Header>

          <p>
            Metric-Teacher is a personal passion project of Seattle-based web developer <b>Kyle Geib</b>. He can be found on <XLink to="www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, <XLink to="https://github.com/TiE23">GitHub</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>. He is currently looking for his next career opportunity as a Fullstack JS developer using ReactJS, NodeJS, and GraphQL with Apollo Client.
          </p>

          <p>
            Metric-Teacher's mascot, <i>Meti the Metric Macaw</i>, and other digital art is by <b>Paul E</b>. His art and information on commissions can be found on <XLink to="http://paulstation2.tumblr.com/tagged/art">Tumblr</XLink>. <i>Please take note that some of his art, while always tasteful, is meant for mature audiences.</i>
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

export default Welcome;
