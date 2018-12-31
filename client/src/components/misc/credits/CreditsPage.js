/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";

import Personnel from "./Personnel";
import Contact from "./Contact";
import Stats from "./Stats";
import Technology from "./Technology";

import ScrollToTopOnMount from "../ScrollToTopOnMount";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_CREDITS,
} from "../../../constants";

const CreditsPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="users" color={PAGE_ICON_COLOR_CREDITS} />
      Credits
    </Header>

    {Personnel}

    <Header dividing content="Contact" />

    {Contact}

    <Header dividing content="Stats" />

    {Stats}

    <Header dividing content="Technology" />

    {Technology}
  </Container>
);

export default CreditsPage;
