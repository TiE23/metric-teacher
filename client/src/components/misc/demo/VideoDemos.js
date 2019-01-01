/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Grid, Header } from "semantic-ui-react";

import ResponsivePlayer from "../ResponsivePlayer";

import {
  SITE_NAME,
} from "../../../constants";

export default [
  {
    key: "intro",
    title: {
      content: "Introduction (3 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
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
        </Grid>
      ),
    },
  },
  {
    key: "challengeMode",
    title: {
      content: "Challenge Mode (8 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Starting a new Challenge
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
                  2) Answering Questions: Multiple choice
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
                  3) Answering Questions: Direct input (single unit)
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
                  4) Answering Questions: Direct input (split unit)
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
                  5) Answering Questions: Slider input
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
                  6) Answering Questions: Survey response
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
                  7) Answering Questions: Incorrect responses
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
                  8) Skipping questions
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
      ),
    },
  },
];
