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
          Getting up to speed.
        </Header.Subheader>
      </Header.Content>
    </Header>

    <Header as="h2" content="Demos" dividing />

    <p>
      See all of {SITE_NAME} without having to use it!
    </p>

    <VideoDemos mode="educator" />

    <Header as="h2" content={`The Inspiration Behind ${SITE_NAME}`} dividing />
    {Inspiration}

    <Header as="h2" content="Stats" dividing />
    {Educational}

    <Header as="h2" content="More Information" dividing />
    <p>
      You can discover a little more about the site and the people behind it, including contact information, <Link to="/credits">here</Link>.
    </p>

    <Header as="h2" content={`Start using ${SITE_NAME} today!`} dividing />
    <SignupLoginButtons from="/home" />
  </Container>
);

export default IntroPage;
