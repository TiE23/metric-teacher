/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Grid, Header, Icon, Image } from "semantic-ui-react";

import ScrollToTopOnMount from "../ScrollToTopOnMount";
import XLink from "../ExternalLink";
import ResponsivePlayer from "../ResponsivePlayer";

import {
  PAGE_ICON_COLOR_CREDITS,
  PAGE_TITLE_HEADER_SIZE,
  SITE_NAME,
} from "../../../constants";

const DemoPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="play circle outline" color={PAGE_ICON_COLOR_CREDITS} />
      {SITE_NAME} Demo
    </Header>

    <Header as="h2" content="Personal Introduction" dividing />
    <Image src="/img/credits/kyle.gif" size="small" floated="right" rounded />

    <p>
      Hello! I'm <b>Kyle Geib</b> and I'm a Seattle-based developer who graduated from <i>University of Washington Bothell</i> and worked for five years at <i>Accretive Technology Group</i> (ATG), an independent web company that specializes in video streaming.
    </p>

    <Header as="h3" content="My Time at ATG" />

    <p>
      In 2013 I started as an <b>intern</b> and became one of their first <b>SDET</b>s. In 2015 I became a <b>Support Engineer</b>, essentially a programming handyman. Fixing hideous bugs in PHP, writing automation scripts, designing CLI tools in Python, writing crazy MySQL queries, and building basic admin tools using jQuery.
    </p>

    <Header as="h3" content="Needing Change" />

    <p>
      But I wanted to become a <b>Full-stack JavaScript developer</b>. My company was moving to <b>ReactJS</b> front-ends and <b>NodeJS</b> back-end services running on <b>Docker</b> containers. I was stuck fixing bugs and adding admin tools in decade-old and untestable PHP code. I knew I had to take drastic steps if I wanted to improve my career.
    </p>

    <Header as="h3" content={`Building ${SITE_NAME}`} />

    <p>
      After five years I amicably parted ways with ATG in <b>January 2018</b>. I then launched myself into full-time self-teaching: <i>JavaScript ES6</i>, <i>NodeJS</i>, <i>GraphQL</i>, <i>ReactJS</i>, <i>Apollo Client</i>, <i>Docker</i>, <i>AWS EC2</i>... all of it new to me.
    </p>

    <p>
      By May I had pushed my <XLink to="https://github.com/TiE23/metric-teacher">first commit</XLink> to {SITE_NAME} and after <b>eight months</b> of full-time, solo work I finally brought my first website live on December 20th, 2018.
    </p>

    <Header as="h2" content={`The Inspiration Behind ${SITE_NAME}`} dividing />

    <p>
      A few years ago I was using <XLink to="https://www.duolingo.com/"><b>Duolingo</b></XLink>, a site that teaches foreign languages through repetition of <b>programmatically generated flash-cards</b> that you return to for 10 minutes a day. I thought that the same method could work for teaching Americans the Metric System.
    </p>

    <Header as="h3" content="Thinking In Metric" />

    <p>
      I've had experience driving rental cars in Ireland, France, and Japan where I found myself becoming comfortable with kilometers per hour. After some time <i>I wasn't thinking</i> "Oh, 50 km/h is about 30 mph", I was simply <b>thinking</b> in kilometers per hour.
    </p>

    <p>
      If I could teach people that 50 km/h was equivalent to what they thought about 30 mph ("that's city-street speeds" or "about the fastest I could ride a bicycle"), then that'd be the first step.
    </p>

    <Header as="h3" content="Making It Personal" />

    <p>
      How <b>tall</b> are you? How much do you <b>weigh</b>? What's the coolest <b>outdoor temperature</b> that you'd wear shorts in?  We all have answers to these questions even if they might be hard to pin down. But if you can learn to recognize that 21°C and 70°F are both your preferred room temperature then you'll start to simply feel in Celsius.
    </p>

    <p>
      This idea is {SITE_NAME}'s <b>Survey Question</b> system. By asking people meaningful questions they can begin associating Metric unit measurements with those answers.
    </p>

    <Header as="h2" content="Video Demonstrations" dividing />

    <Grid stackable padded="horizontally" columns="equal" textAlign="center">

      <Grid.Row>
        <Grid.Column>
          <Header as="h2" content="Start" />

          <Header as="h3">
            <Header.Content>
              1) Creating an account
              <Header.Subheader>
                Sign-up or login with e-mail and password. JWT is returned via GraphQL mutation.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/01-starting-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2) Enrolling as a student
              <Header.Subheader>
                A new student can enroll and set whether they are more familiar with US or Metric units. {SITE_NAME} will teach the student appropriately.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/01-enrolling-02.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              3) Building a course load
              <Header.Subheader>
                Students choose what subjects and scales they want to learn. Scale choices are important. Length, for example, can encompass centimeters to measure someone's height or kilometers to measure distances between cities.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/02-assigning-subjects-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h2" content="Challenge Mode" />

          <Header as="h3">
            <Header.Content>
              1) Kicking Off a new Challenge
              <Header.Subheader>
                A student can customize what subjects they want to tackle and the length of their Challenge.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/03-kickoff-page-02.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2a) Answering Questions: Multiple choice
              <Header.Subheader>
                The most basic form of question. Choose between 2 to 6 possible answers.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-a-multiple-choice-02.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2b) Answering Questions: Direct input (single unit)
              <Header.Subheader>
                The toughest questions demand the student to directly input their answer. I use a custom keypad to save time on activating and deactivating mobile keyboards.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-b-direct-single-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2c) Answering Questions: Direct input (split unit)
              <Header.Subheader>
                Intelligent support for input in feet & inches, pounds & ounces, and gallons, quarts, & fluid ounces.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-b-direct-split-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2d) Answering Questions: Slider input
              <Header.Subheader>
                To discourage guessing slider input is designed to be sure that the correct answer isn't always somewhere in the middle.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-c-slider-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2e) Answering Questions: Survey response
              <Header.Subheader>
                Survey responses use slider input and have a predefined input range. Personal notes are also supported on some Surveys and are used to enrich questions.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-c-slider-01.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              2f) Answering Questions: Incorrect responses
              <Header.Subheader>
                Incorrect responses hurt Mastery Score and uses a strike system before giving up. {SITE_NAME} will remember incorrect answers to help a student learn from their mistakes.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-e-incorrect-02.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Header.Content>
              3) Skipping questions
              <Header.Subheader>
                Students can skip any question at the cost of Mastery Score.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <ResponsivePlayer
            xyRatio={4 / 3}
            player={{
              volume: 0,
              muted: true,
              playing: true,
              loop: true,
              playsinline: true,
              url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-e-skip-02.mp4",
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);


export default DemoPage;
