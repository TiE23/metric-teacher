/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Grid, Header, Image, List } from "semantic-ui-react";

import SignupLoginButtons from "../misc/SignupLoginButtons";
import XLink from "../misc/ExternalLink";
import FrameFooter from "../main/FrameFooter";

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
            Metric-Teacher is a free website that will help you learn to imagine, understand, and describe objects, people, and the world in a new system of units!
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
      <Grid.Column>
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
      <Grid.Column width={5}>
        <Image src="/img/challenge/m-written.gif" size="small" rounded centered />
        <Header textAlign="center">Written</Header>
      </Grid.Column>
      <Grid.Column width={5}>
        <Image src="/img/challenge/m-conversion.gif" size="small" rounded centered />
        <Header textAlign="center">Conversion</Header>
      </Grid.Column>
      <Grid.Column width={5}>
        <Image src="/img/challenge/m-survey.gif" size="small" rounded centered />
        <Header textAlign="center">Survey</Header>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <List>
            <List.Item>
              <b>Written Questions</b> are multiple-choice questions that range from simple facts about units to the measurements of real-world objects, people, locations, records, and more!
            </List.Item>
            <List.Item>
              <b>Conversion Questions</b> are dynamically generated questions that ask you to convert one measurement to another. There are multiple methods of answering including multiple choice, slider bar, and direct input!
            </List.Item>
            <List.Item>
              <b>Survey Questions</b> are special to Metric-Teacher. Surveys will ask you both factual and opinion-based questions ranging from your own height to your preferred room temperature. Metric-Teacher will then teach you these values in Metric, giving you personalized content!
            </List.Item>
          </List>

          <p>
            You will be performing conversions regularly and you'll get quick at them! But over time you'll begin to recognize natural patterns. Just like how you don't need to think how much 300 pounds weighs of how long 6 feet, 7 inches is to recognize that those two values together makes for a very large person! You'll get that same sensation with 135 kilograms and 200 centimeters!
          </p>
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
            Metric-Teacher offers courses on <b>six</b> major subjects!
          </p>

          <List>
            <List.Item>
              <XLink to="docs/guide/length">Length</XLink>
            </List.Item>
            <List.Item>
              <XLink to="docs/guide/mass">Mass</XLink>
            </List.Item>
            <List.Item>
              <XLink to="docs/guide/volume">Volume</XLink>
            </List.Item>
            <List.Item>
              <XLink to="docs/guide/temperature">Temperature</XLink>
            </List.Item>
            <List.Item>
              <XLink to="docs/guide/velocity">Velocity</XLink>
            </List.Item>
            <List.Item>
              <XLink to="docs/guide/area">Area</XLink>
            </List.Item>
          </List>

          <p>
            View all available Subjects <XLink to="subjects">here</XLink>. View all documentation <XLink to="docs">here</XLink>.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            But I already know the Metric system! Can it still help me?
          </Header>

          <p>
            Metric-Teacher can still help by teaching you the US Customary Unit system! Simply set your profile to say that you prefer the Metric system when enrolling and you'll be given questions more appropriate to your needs!
          </p>

          <p>
            So, if you're going to the United States and want to be able to read weather forecasts in Fahrenheit, understand distances in miles, or order drinks with fluid ounces you can use Metric-Teacher to prepare you!
          </p>

          <p>
            If you're going to the United Kingdom instead, you should take a moment to note that differences in the Imperial system used in the UK exist for volume. Read more <XLink to="docs/uscustomary/liquid">here</XLink>.
          </p>
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row textAlign="center">
      <Grid.Column>
        <Container text>
          <Header size="large">
            So, are you ready to learn?
          </Header>
          <Image src="/img/challenge/r-correct-b.gif" centered size="large" />
          <SignupLoginButtons from="/home" />
        </Container>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Container text>
          <Header dividing>
            Who made this?
          </Header>

          <p>
            Metric-Teacher is the personal project of Seattle-based web developer <b>Kyle Geib</b>. He can be found on <XLink to="www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, <XLink to="https://github.com/TiE23">GitHub</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>.
          </p>

          <p>
            Metric-Teacher's mascot, <i>Meti the Metric Macaw</i>, and other painted art is by <b>Paul E</b>. His art can be found on <XLink to="http://paulstation2.tumblr.com/tagged/art">Tumblr</XLink>. <i>Please be aware that some of his art is (tastefully) <u>NSFW</u>.</i>
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
