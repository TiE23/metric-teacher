/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Item } from "semantic-ui-react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <Item.Group>
    <Item>
      <Item.Image src="/img/credits/kyle.gif" size="medium" />
      <Item.Content>
        <Item.Header>Kyle Geib</Item.Header>
        <Item.Meta>Creator and Developer</Item.Meta>
        <Item.Description>
          <p>
            Seattle-based web developer who wanted to learn both modern JS web development <i>and</i> the Metric System... so... I guess <i>this</i> happened.
          </p>

          <p>
            Kyle is currently looking for his next career opportunity as a Fullstack JavaScript developer using ReactJS, NodeJS, and GraphQL with Apollo Client. {SITE_NAME} is his first website.
          </p>

          <p>
            Find Kyle on <XLink to="https://github.com/TiE23">GitHub</XLink>, <XLink to="https://www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>.
          </p>
        </Item.Description>
      </Item.Content>
    </Item>
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
