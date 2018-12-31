/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon, Image } from "semantic-ui-react";

import ScrollToTopOnMount from "../ScrollToTopOnMount";
import ExternalLink from "../ExternalLink";

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

    <Image src="/img/credits/kyle.gif" size="small" floated="right" bordered rounded />
    <Header as="h2" content="Personal Introduction" />

    <p>
      Hello! I'm <b>Kyle Geib</b> and I'm a Seattle-based developer who graduated from <i>University of Washington Bothell</i> and worked for five years at <i>Accretive Technology Group</i> (ATG), an independent web company that specializes in video streaming.
    </p>

    <Header as="h3" content="My time at ATG" />

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
      By May I had pushed my <ExternalLink to="https://github.com/TiE23/metric-teacher">first commit</ExternalLink> to {SITE_NAME} and after <b>eight months</b> of full-time, solo work I finally brought my first website live on <b>December 20th, 2018</b>.
    </p>
  </Container>
);


export default DemoPage;
