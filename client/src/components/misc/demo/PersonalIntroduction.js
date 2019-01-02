/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Header, Image } from "semantic-ui-react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <Image src="/img/credits/kyle.gif" size="small" floated="right" rounded />

    <p>
      Hello! I'm <b>Kyle Geib</b> and I'm a Seattle-based developer and <i>University of Washington Bothell</i> graduated. I worked for five years at <i>Accretive Technology Group</i> (ATG), an independent web company that specializes in video streaming.
    </p>

    <Header as="h3" content="My Time at ATG" />

    <p>
      I started at ATG as an <b>intern</b> in 2013 and became one of their first <b>SDET</b>s. In 2015 I became a <b>Support Engineer</b>, essentially a programming jack-of-all-trades. I did everything from fixing bugs in backend PHP, manually testing site code, designing automation scripts, building custom CLI tools in Python, writing crazy MySQL queries, playing with Node micro-services, and constructing basic admin tools using jQuery.
    </p>

    <Header as="h3" content="Needing Change" />

    <p>
      There was fun to be had, but I wanted to become a <b>Full-stack JavaScript developer</b>. My company was moving to <b>ReactJS</b> for their front-end and <b>NodeJS</b> back-end services running on <b>Docker</b> containers. But I was stuck fixing bugs and adding admin tools in decade-old PHP code. I knew I had to take drastic steps if I wanted to improve my career. I needed skills that would make me an asset - not a liability - on a tight-knit feature team.
    </p>

    <Header as="h3" content={`Building ${SITE_NAME}`} />

    <p>
      I made my decision. After five years I amicably parted ways with ATG in January 2018. I then launched myself into full-time self-teaching: <b>JavaScript ES6</b>, <b>NodeJS</b>, <b>GraphQL</b>, <b>ReactJS</b>, <b>Apollo Client</b>, <b>Docker</b>, <b>AWS EC2</b>... all of it new to me.
    </p>

    <p>
      By May I had pushed my first {SITE_NAME} <XLink to="https://github.com/TiE23/metric-teacher">commit to GitHub</XLink> and after <b>eight months</b> of full-time work I finally brought my first website live on December 20th, 2018.
    </p>
  </React.Fragment>
);
