/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon, Image } from "semantic-ui-react";

import ScrollToTopOnMount from "../ScrollToTopOnMount";
import XLink from "../ExternalLink";

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
  </Container>
);


export default DemoPage;
