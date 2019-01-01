/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Accordion, Container, Header, Icon, Image } from "semantic-ui-react";

import ScrollToTopOnMount from "../ScrollToTopOnMount";
import XLink from "../ExternalLink";

import VideoDemos from "./VideoDemos";
import { Educational, Technical } from "../credits/Stats";
import Technology from "../credits/Technology";

import {
  PAGE_ICON_COLOR_DEMO,
  PAGE_TITLE_HEADER_SIZE,
  SITE_NAME,
} from "../../../constants";

const DemoPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Header.Content>
        <Icon name="play circle outline" color={PAGE_ICON_COLOR_DEMO} />
        {SITE_NAME} Demo
        <Header.Subheader>
          For your consideration.
        </Header.Subheader>
      </Header.Content>
    </Header>

    <Header as="h2" content="Demos" dividing />

    <p>See all of {SITE_NAME} without having to use it!</p>

    <Accordion
      panels={VideoDemos}
      exclusive
      styled
      fluid
    />

    <Header as="h2" content="A Personal Introduction" dividing />
    <Image src="/img/credits/kyle.gif" size="small" floated="right" rounded />

    <p>
      Hello! I'm <b>Kyle Geib</b> and I'm a Seattle-based developer who graduated from <i>University of Washington Bothell</i> and worked for five years at <i>Accretive Technology Group</i> (ATG), an independent web company that specializes in video streaming.
    </p>

    <Header as="h3" content="My Time at ATG" />

    <p>
      In 2013 I started as an <b>intern</b> and became one of their first <b>SDET</b>s. In 2015 I became a <b>Support Engineer</b>, essentially a programming handyman. I did everything from fixing bugs in PHP, writing automation scripts, designing CLI tools in Python, writing crazy MySQL queries, playing with Node micro services, and building basic admin tools using jQuery.
    </p>

    <Header as="h3" content="Needing Change" />

    <p>
      I wanted to become a <b>Full-stack JavaScript developer</b>. My company was moving to <b>ReactJS</b> front-ends and <b>NodeJS</b> back-end services running on <b>Docker</b> containers. But I was stuck fixing bugs and adding admin tools in decade-old and untestable PHP code. I knew I had to take drastic steps if I wanted to improve my career. I needed skills that would make me an asset on a new team, not a liability.
    </p>

    <Header as="h3" content={`Building ${SITE_NAME}`} />

    <p>
      I made my decision. After five years I amicably parted ways with ATG in January 2018. I then launched myself into full-time self-teaching: <b>JavaScript ES6</b>, <b>NodeJS</b>, <b>GraphQL</b>, <b>ReactJS</b>, <b>Apollo Client</b>, <b>Docker</b>, <b>AWS EC2</b>... all of it new to me.
    </p>

    <p>
      By May I had pushed my first {SITE_NAME} <XLink to="https://github.com/TiE23/metric-teacher">commit to GitHub</XLink> and after <b>eight months</b> of full-time, solo work I finally brought my first website live on December 20th, 2018.
    </p>


    <Header as="h2" content={`The Inspiration Behind ${SITE_NAME}`} dividing />
    <Image src="/img/mascot/clipboard.gif" size="medium" floated="right" rounded />

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

    <Header as="h2" content={`The Technology Behind ${SITE_NAME}`} dividing />
    {Technology}

    <Header as="h2" content={`The Stats of ${SITE_NAME}`} dividing />
    {Technical}
    {Educational}

    <Header as="h2" content="Thank You" dividing />

    <p>
      This website is only the beginning. If you're reading this wondering if I might be an asset to your company I really appreciate you taking the time to look at my work. I am excessively excited to see what I can do in a professional environment and am looking forward to working with you.
    </p>

  </Container>
);


export default DemoPage;
