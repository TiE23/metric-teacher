import React from "react";
import { Container, Header, Icon, Item } from "semantic-ui-react";
import { PAGE_TITLE_HEADER_SIZE } from "../../constants";

import {
  KyleG,
  PaulE,
} from "./CreditsText";

const CreditsPage = () => (
  <Container text>
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="users" color="teal" />
      Metric-Teacher Credits
    </Header>

    <Item.Group>
      <Item>
        <Item.Image src="/img/mascot/portrait.gif" size="small" />
        <Item.Content>
          <Item.Header>Kyle Geib</Item.Header>
          <Item.Meta>Creator</Item.Meta>
          <Item.Description>
            {KyleG}
          </Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image src="/img/mascot/portrait.gif" size="small" />
        <Item.Content>
          <Item.Header>Paul E.</Item.Header>
          <Item.Meta>Digital Artist</Item.Meta>
          <Item.Description>
            {PaulE}
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  </Container>
);

export default CreditsPage;
