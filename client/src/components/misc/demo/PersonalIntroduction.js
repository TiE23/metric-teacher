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
      Hello! I'm <b>Kyle Geib</b>, a <i>University of Washington Bothell</i> graduate and professional web developer local to Seattle. I worked for five years at <i>Accretive Technology Group</i> (ATG), an independent web company that specializes in video streaming.
    </p>

    <Header as="h3" content="My Time at ATG" />

    <p>
      I started at ATG as an intern in 2013 and became one of their first <b>SDET</b>s. In 2015 I became a <b>Support Engineer</b>, essentially a programming jack-of-all-trades. I did everything from fixing bugs in backend PHP, designing automated tests, writing build and test automation scripts, building custom CLI tools in Python, writing crazy MySQL queries, playing with Node micro-services, and constructing basic admin tools using jQuery.
    </p>

    <Header as="h3" content="Needing Change" />

    <p>
      Every day was something new but I wanted to become a <b>full-stack JavaScript developer</b>. ATG was moving to <b>React</b> for their front-end and <b>Node.js</b> services running on <b>Docker</b> containers. While feature teams switched to new technology I was still working in a decade-old PHP codebase. If I wanted to join a tight-knit feature team I needed to be an asset; not a liability.
    </p>

    <Header as="h3" content="New Direction" />

    <p>
      ATG offered so much to try and make it work but I knew I needed to dedicate myself full-time to make change happen. So after five years with ATG I amicably parted ways with them in January 2018. From there I launched myself into full-time self-teaching. I learned <b>JavaScript</b>, <b>Node.js</b>, <b>GraphQL</b>, <b>React</b>, <b>Apollo Client</b>, <b>Docker</b>, <b>AWS EC2</b>, and more. All of it was new to me.
    </p>

    <Header as="h3" content={`Building ${SITE_NAME}`} />

    <p>
      After tutorials and practice projects I was ready to chase after the Metric System teaching idea I had in me for years. By May I had pushed my first {SITE_NAME} commit <XLink to="https://github.com/TiE23/metric-teacher">to GitHub</XLink>. After nearly <b>eight months</b> of full-time work I finally brought {SITE_NAME}, my first website, live on December 20th, 2018.
    </p>
  </React.Fragment>
);
