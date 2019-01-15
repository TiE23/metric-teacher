/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon, Responsive } from "semantic-ui-react";

import ScrollToTopOnMount from "../ScrollToTopOnMount";

import Carousel from "../carousel/Carousel";
import VideoDemos from "./VideoDemos";
import PersonalIntroduction from "./PersonalIntroduction";
import ThankYou from "./ThankYou";
import { Technical } from "../credits/Stats";
import Technology from "../credits/Technology";

import CarouselVideos from "../../landing/welcome/CarouselVideos";

import {
  MOBILE_BREAKPOINT,
  PAGE_ICON_COLOR_DEMO,
  PAGE_ICON_COLOR_WELCOME,
  PAGE_TITLE_HEADER_SIZE,
  SITE_NAME,
} from "../../../constants";

const DemoPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Header.Content>
        <Icon name="bullhorn" color={PAGE_ICON_COLOR_DEMO} />
        {SITE_NAME} Demonstration
        <Header.Subheader>
          For your consideration.
        </Header.Subheader>
      </Header.Content>
    </Header>

    <Header
      as="h2"
      content="Sizzle Reel"
      subheader="Attractive carousel of videos shown to first-time visitors."
      dividing
    />

    {/* Desktop */}
    <Responsive
      as={Carousel}
      minWidth={MOBILE_BREAKPOINT}
      panels={CarouselVideos(1.2)}
      controlColor={PAGE_ICON_COLOR_WELCOME}
      incrementOnClick
      wrapping
    />

    {/* Mobile */}
    <Responsive
      as={Carousel}
      maxWidth={MOBILE_BREAKPOINT - 1}
      panels={CarouselVideos(0.8)}
      controlColor={PAGE_ICON_COLOR_WELCOME}
      incrementOnClick
      wrapping
    />

    <Header
      as="h2"
      content="Demos"
      subheader={`See all of ${SITE_NAME} without having to use it!`}
      dividing
    />

    <VideoDemos mode="recruiter" />

    <Header as="h2" content="Stats" dividing />
    {Technical}

    <Header as="h2" content={`The Technology Behind ${SITE_NAME}`} dividing />
    {Technology}

    <Header as="h2" content="A Personal Introduction" dividing />
    {PersonalIntroduction}

    <Header as="h2" content="Thank You" dividing />
    {ThankYou}
  </Container>
);

export default DemoPage;
