/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Header, List } from "semantic-ui-react";

import {
  MASCOT_NAME_LONG,
} from "../../../constants";

export const Educational = (
  <React.Fragment>
    <Header size="small" content="Educational" />
    <List horizontal bulleted>
      <List.Item>6 Subjects</List.Item>
      <List.Item>56 Sub-Subjects</List.Item>
      <List.Item>660+ Questions</List.Item>
      <List.Item>3 Question Types</List.Item>
      <List.Item>5 Difficulty Levels</List.Item>
      <List.Item>3 Answer Methods</List.Item>
      <List.Item>17 Different Metric Units</List.Item>
      <List.Item>23 Different US Units</List.Item>
      <List.Item>31 Pages of Original Documentation</List.Item>
    </List>
  </React.Fragment>
);

export const Artistic = (
  <React.Fragment>
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
  </React.Fragment>
);

export const Technical = (
  <React.Fragment>
    <Header size="small" content="Technical" />
    <List horizontal bulleted>
      <List.Item>130+ React Components</List.Item>
      <List.Item>22,000+ Javascript SLOC</List.Item>
      <List.Item>35 GraphQL Query Endpoints</List.Item>
      <List.Item>27 GraphQL Mutation Endpoints</List.Item>
      <List.Item>150+ Closed GitHub Issues</List.Item>
      <List.Item>680+ Non-merge Commits</List.Item>
      <List.Item>4 Different User Types</List.Item>
      <List.Item>150+ Unit Tests</List.Item>
      <List.Item>4 Different Admin Tools</List.Item>
      <List.Item>26 Pages of Markdown Documentation</List.Item>
      <List.Item>1 Self-driven Developer</List.Item>
    </List>
  </React.Fragment>
);
