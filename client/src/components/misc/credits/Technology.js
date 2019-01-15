/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { List } from "semantic-ui-react";

import XLink from "../ExternalLink";

export default (
  <List>
    <List.Item>
      <List.Icon name="browser" />
      <List.Content>
        <List.Header>Client</List.Header>
      </List.Content>
      <List.List>
        <List.Item>
          <List.Icon name="react" />
          <List.Content>
            <List.Header>
              <XLink to="https://reactjs.org/">React</XLink>
            </List.Header>
            <List.Description>
              "A JavaScript library for building user interfaces"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="facebook" />
          <List.Content>
            <List.Header>
              <XLink to="https://github.com/facebook/create-react-app">Create React App</XLink>
            </List.Header>
            <List.Description>
              "Set up a modern web app by running one command"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="rocket" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.apollographql.com/">Apollo Client</XLink>
            </List.Header>
            <List.Description>
              "A complete solution to do GraphQL right"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="columns" />
          <List.Content>
            <List.Header>
              <XLink to="https://github.com/Semantic-Org/Semantic-UI-React">
                Semantic-UI React
              </XLink>
            </List.Header>
            <List.Description>
              "The official Semantic-UI-React integration"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="paint brush" />
          <List.Content>
            <List.Header>
              <XLink to="https://semantic-ui-forest.com/themes">Semantic-UI Forest</XLink>
            </List.Header>
            <List.Description>
              "Collection of Bootswatch and Semantic-UI themes"
            </List.Description>
          </List.Content>
        </List.Item>
      </List.List>
    </List.Item>

    <List.Item>
      <List.Icon name="server" />
      <List.Content>
        <List.Header>Server</List.Header>
      </List.Content>
      <List.List>
        <List.Item>
          <List.Icon name="node" />
          <List.Content>
            <List.Header>
              <XLink to="https://nodejs.org/">Node.js</XLink>
            </List.Header>
            <List.Description>
              "A JavaScript runtime built on Chrome's V8 JavaScript engine"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="facebook" />
          <List.Content>
            <List.Header>
              <XLink to="https://graphql.org/">GraphQL</XLink>
            </List.Header>
            <List.Description>
              "A query language for your API"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="code" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.prisma.io/">Prisma</XLink>
            </List.Header>
            <List.Description>
              "GraphQL for modern developers"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="heartbeat" />
          <List.Content>
            <List.Header>
              <XLink to="https://github.com/prisma/graphql-yoga">GraphQL Yoga</XLink>
            </List.Header>
            <List.Description>
              "Fully-featured GraphQL Server"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="database" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.oracle.com/mysql/">MySQL</XLink>
            </List.Header>
            <List.Description>
              "The world’s most popular open source database"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="node js" />
          <List.Content>
            <List.Header>
              <XLink to="https://github.com/javiercejudo/linear-converter">
                Javier Cejudo's Linear-Converter Library
              </XLink>
            </List.Header>
            <List.Description>
              "Flexible linear converter"
            </List.Description>
          </List.Content>
        </List.Item>
      </List.List>
    </List.Item>

    <List.Item>
      <List.Icon name="hdd" />
      <List.Content>
        <List.Header>Hosting</List.Header>
      </List.Content>
      <List.List>
        <List.Item>
          <List.Icon name="docker" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.docker.com/">Docker</XLink>
            </List.Header>
            <List.Description>
              "Industry-leading container engine technology"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="aws" />
          <List.Content>
            <List.Header>
              <XLink to="https://aws.amazon.com/ec2/">AWS EC2</XLink>
            </List.Header>
            <List.Description>
              "A web service that provides secure, resizable compute capacity in the cloud"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="sitemap" />
          <List.Content>
            <List.Header>
              <XLink to="https://traefik.io/">Traefik</XLink>
            </List.Header>
            <List.Description>
              "The cloud native edge router"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="lock" />
          <List.Content>
            <List.Header>
              <XLink to="https://letsencrypt.org/">Let's Encrypt</XLink>
            </List.Header>
            <List.Description>
              "A free, automated, and open Certificate Authority"
            </List.Description>
          </List.Content>
        </List.Item>
      </List.List>
    </List.Item>

    <List.Item>
      <List.Icon name="keyboard" />
      <List.Content>
        <List.Header>Tools</List.Header>
      </List.Content>
      <List.List>
        <List.Item>
          <List.Icon name="file code" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.jetbrains.com/webstorm/">JetBrains WebStorm</XLink>
            </List.Header>
            <List.Description>
              "The smartest JavaScript IDE"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="github" />
          <List.Content>
            <List.Header>
              <XLink to="https://github.com/TiE23/metric-teacher">GitHub</XLink>
            </List.Header>
            <List.Description>
              "A development platform inspired by the way you work"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="code branch" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.syntevo.com/smartgit/">Syntevo SmartGit</XLink>
            </List.Header>
            <List.Description>
              "A powerful, multi-platform Git client"
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="file code outline" />
          <List.Content>
            <List.Header>
              <XLink to="https://www.sublimetext.com/">Sublime Text 3</XLink>
            </List.Header>
            <List.Description>
              "A sophisticated text editor for code, markup, and prose"
            </List.Description>
          </List.Content>
        </List.Item>
      </List.List>
    </List.Item>
  </List>
);
