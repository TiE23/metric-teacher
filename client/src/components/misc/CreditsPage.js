/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Container, Header, Icon, Item, List } from "semantic-ui-react";

import ScrollToTopOnMount from "./ScrollToTopOnMount";
import XLink from "./ExternalLink";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_CREDITS,
  MASCOT_NAME_LONG,
  SITE_NAME,
} from "../../constants";

const CreditsPage = () => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="users" color={PAGE_ICON_COLOR_CREDITS} />
      Credits
    </Header>

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
              He is currently looking for his next career opportunity as a Fullstack JavaScript developer using ReactJS, NodeJS, and GraphQL with Apollo Client. {SITE_NAME} is his first website.
            </p>

            <p>
              Find him on <XLink to="https://github.com/TiE23">GitHub</XLink>, <XLink to="https://www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>.
            </p>
          </Item.Description>
        </Item.Content>
      </Item>
      <Item>
        <Item.Image src="/img/credits/paul.gif" size="medium" />
        <Item.Content>
          <Item.Header>Paul E.</Item.Header>
          <Item.Meta>Digital Artist</Item.Meta>
          <Item.Description>
            <p>
              Californian digital artist who is skillful at drawing both cute parrots and handsome elves.
            </p>

            <p>
              His art and commission rates can be found on <XLink to="http://paulstation2.tumblr.com/tagged/art">Tumblr</XLink>. <i>Please take note that some of his art, while always tasteful, sometimes contain mild nudity.</i>
            </p>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>

    <Header dividing content="Stats" />

    <Header size="small" content="Educational" />
    <List horizontal bulleted>
      <List.Item>6 Subjects</List.Item>
      <List.Item>56 Sub-Subjects</List.Item>
      <List.Item>660+ Questions</List.Item>
      <List.Item>3 Question Types</List.Item>
      <List.Item>5 Difficulty Levels</List.Item>
      <List.Item>3 Answer Methods</List.Item>
      <List.Item>31 Pages of Original Documentation</List.Item>
      <List.Item>17 Different Metric Units</List.Item>
      <List.Item>23 Different US Units</List.Item>
    </List>

    <Header size="small" content="Artistic" />
    <List horizontal bulleted>
      <List.Item>21 Drawings of {MASCOT_NAME_LONG}</List.Item>
      <List.Item>64 Drawn Objects</List.Item>
      <List.Item>1 Green Tree Python Tailor</List.Item>
      <List.Item>1 Weight Lifting African Elephant</List.Item>
      <List.Item>1 Pufferfish Chemist</List.Item>
      <List.Item>1 Polar Bear Tour Guide</List.Item>
      <List.Item>1 Cheetah Sprinter</List.Item>
      <List.Item>1 Flying Squirrel Architect</List.Item>
      <List.Item>1 Very Scarlet Macaw</List.Item>
      <List.Item>1 Imaginative Artist</List.Item>
    </List>

    <Header size="small" content="Technical" />
    <List horizontal bulleted>
      <List.Item>130+ React Components</List.Item>
      <List.Item>22,000+ Javascript SLOC</List.Item>
      <List.Item>35 GraphQL Query Endpoints</List.Item>
      <List.Item>27 GraphQL Mutation Endpoints</List.Item>
      <List.Item>140+ Closed GitHub Issues</List.Item>
      <List.Item>640+ Non-merge Commits</List.Item>
      <List.Item>4 Different User Types</List.Item>
      <List.Item>151 Unit Tests</List.Item>
      <List.Item>4 Different Admin Tools</List.Item>
      <List.Item>26 Pages of Documentation</List.Item>
      <List.Item>1 Self-driven Developer</List.Item>
    </List>

    <Header dividing content="Technology" />

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
                <XLink to="https://reactjs.org/">ReactJS</XLink>
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
                <XLink to="https://nodejs.org/">NodeJS</XLink>
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
  </Container>
);

export default CreditsPage;
