/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";

import KG from "./KG";
import PE from "./PE";
import Contact from "./Contact";
import { Educational, Artistic, Technical } from "./Stats";
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

    {KG}
    {PE}

    <Header dividing content="Contact" />

    {Contact}

    <Header dividing content="Stats" />

    {Educational}
    {Artistic}
    {Technical}

    <Header dividing content="Technology" />

    {Technology}
  </Container>
);

export default CreditsPage;
