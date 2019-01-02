/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Item } from "semantic-ui-react";

import XLink from "../ExternalLink";

export default (
  <Item.Group>
    <Item>
      <Item.Image src="/img/credits/paul.gif" size="medium" />
      <Item.Content>
        <Item.Header>Paul Emery</Item.Header>
        <Item.Meta>Freelance Artist</Item.Meta>
        <Item.Description>
          <p>
            Californian digital artist who can draw both cute parrots and handsome elves with equal skill.
          </p>

          <p>
            Paul's portfolio and contact information can be found on <XLink to="https://www.artstation.com/paulstation2">ArtStation</XLink>.
          </p>
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
);
