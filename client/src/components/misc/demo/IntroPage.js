/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ScrollToTopOnMount from "../ScrollToTopOnMount";
import SignupLoginButtons from "../SignupLoginButtons";

import VideoDemos from "./VideoDemos";
import Inspiration from "./Inspiration";
import { Educational } from "../credits/Stats";

import {
  PAGE_ICON_COLOR_DEMO,
  PAGE_TITLE_HEADER_SIZE,
  SITE_NAME,
} from "../../../constants";

const IntroPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Header.Content>
        <Icon name="bullhorn" color={PAGE_ICON_COLOR_DEMO} />
        Introducing {SITE_NAME}
        <Header.Subheader>
          "Learn the Metric System in a new, fun, and easy way!"
        </Header.Subheader>
      </Header.Content>
    </Header>

    <Header
      as="h2"
      content="Demos"
      subheader={`See all of ${SITE_NAME} without having to use it!`}
      dividing
    />

    <VideoDemos mode="educator" />

    <Header as="h2" content={`The Inspiration Behind ${SITE_NAME}`} dividing />
    {Inspiration}

    <Header as="h2" content="Stats" dividing />
    {Educational}

    <Header as="h2" content="More Information" dividing />
    <p>
      For more information (and a heavier read) you can look at {SITE_NAME}'s <Link to="/docs/1/missionstatement">mission statement</Link>.
    </p>

    <p>
      Finally, you can discover a little more about the site and the people behind it, including contact information, on the <Link to="/credits">credits page</Link>.
    </p>

    <Header as="h2" content={`Start using ${SITE_NAME} today!`} dividing />
    <Container textAlign="center">
      <SignupLoginButtons from="/home" />
    </Container>
  </Container>
);

export default IntroPage;
