/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header } from "semantic-ui-react";

import ResponsivePlayer from "../../misc/ResponsivePlayer";

import {
  SITE_NAME,
} from "../../../constants";


export default xyRatio => [
  <Container key="challenge" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/01-challenge-mode-short.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Get better by taking Challenges!
        <Header.Subheader>
          {SITE_NAME} dynamically generates Challenges and tailors special Survey questions for every student.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
  <Container key="mistakes" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/02-incorrect-recorrect.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Learn from your mistakes!
        <Header.Subheader>
          Get reminders of previous incorrect answers so you can get better, faster.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
  <Container key="kickoff" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/03-challenge-kickoff-long.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Customize your Challenges!
        <Header.Subheader>
          Select what Subjects you want to see and adjust the length to what you want.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
  <Container key="tips" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/04-tips.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Never stay stuck for long!
        <Header.Subheader>
          Handy conversion tips are only a tap away.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
  <Container key="complete" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/05-challenge-end.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Improve with practice!
        <Header.Subheader>
          Track your progress over time and face more difficult questions as you get better.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
  <Container key="subjects" text>
    <ResponsivePlayer
      xyRatio={xyRatio}
      playerProps={{
        volume: 0,
        muted: true,
        playing: true,
        loop: true,
        playsinline: true,
        url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/welcome/06-subjects.mp4",
      }}
      playerStyle={{}}
    />
    <Header>
      <Header.Content>
        Discover topics that interest you!
        <Header.Subheader>
          Six Subjects, twenty-eight scales, and nearly forty different units to choose from.
        </Header.Subheader>
      </Header.Content>
    </Header>
  </Container>,
];
