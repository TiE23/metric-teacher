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
        <Item.Meta>Designer & Developer</Item.Meta>
        <Item.Description>
          <p>
            Seattle-based web developer who wanted to learn both modern JavaScript web development <i>and</i> the Metric System... so... guess <i>this</i> happened.
          </p>

          <p>
            Kyle is currently looking for his next career opportunity as a full-stack JavaScript developer using React, Node.js, and GraphQL with Apollo Client.
          </p>

          <p>
            {SITE_NAME} is his first website.
          </p>

          <p>
            Find Kyle on <XLink to="https://github.com/TiE23">GitHub</XLink>, <XLink to="https://www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>. You can also view his <XLink to="https://s3-us-west-2.amazonaws.com/metric-teacher/other/Kyle_Geib_Resume.pdf">current résumé</XLink>.
          </p>
        </Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
);
