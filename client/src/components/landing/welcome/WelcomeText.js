/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Icon } from "semantic-ui-react";

import DocumentationContent from "../../documentation/DocumentationContent";

import {
  SITE_NAME,
} from "../../../constants";

const style = { color: "teal" };

export default [
  {
    key: "work",
    title: {
      content: (
        <span style={style}>How does {SITE_NAME} work?</span>
      ),
    },
    content: {
      content: (
        <React.Fragment>
          <p>
            If you've ever used Duolingo you'll have an idea how to use {SITE_NAME}. Learn by answering rapid-fire conversion questions in the dynamic <b>Challenge</b> system.
          </p>

          <p>
            Choose a subject and a sub-subject like "<i>Mass - Human-scale</i>" and learn to convert your and your friends' body weights between pounds and kilograms. Choose "<i>Temperature - Weather-scale</i>" and become a master of both Fahrenheit <i>and</i> Celsius weather forecasts!
          </p>

          <p>
            By encouraging quick answering and rough conversions, {SITE_NAME} helps you develop a <i>sense</i> for the Metric System!
          </p>

          {DocumentationContent.howTo.challenges.questionTypes.content}
        </React.Fragment>
      ),
    },
  },
  {
    key: "teach",
    title: {
      content: (
        <span style={style}>What can {SITE_NAME} teach me?</span>
      ),
    },
    content: {
      content: (
        <React.Fragment>
          <p>
            {SITE_NAME} offers instruction on <b>six</b> Subjects!
          </p>

          <Grid>
            <Grid.Row textAlign="center" centered columns="equal">
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="arrows alternate horizontal" size="huge" color="red" />
                  <Header.Content>Length</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="balance scale" size="huge" color="yellow" />
                  <Header.Content>Mass</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="cube" size="huge" color="blue" />
                  <Header.Content>Volume</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row textAlign="center" centered columns="equal">
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="thermometer three quarters" size="huge" color="orange" />
                  <Header.Content>Temperature</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="location arrow" size="huge" color="olive" />
                  <Header.Content>Velocity</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header icon textAlign="center">
                  <Icon name="clone outline" size="huge" color="teal" />
                  <Header.Content>Area</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <br />

          <p>
            You can view all <Icon name="tasks" />Subjects <Link to="/subjects">here</Link>.
          </p>

          <p>
            You can view all <Icon name="book" />Documentation <Link to="/docs/guide">here</Link>.
          </p>
        </React.Fragment>
      ),
    },
  },
  {
    key: "math",
    title: {
      content: (
        <span style={style}>Does {SITE_NAME} involve a math?</span>
      ),
    },
    content: {
      content: (
        <React.Fragment>
          <p>
            There's no getting around it but, yes, you will be performing conversion calculations in your head. {SITE_NAME} provides <Link to="/docs/guide/mentalmath">tips</Link> for mental math and conversion tricks for every unit. But with practice not only will you get get quick at them, you'll start to simply recognize new values.
          </p>

          <p>
            Just like you've known your entire life that <b>104°F</b> is a blisteringly hot day, you'll learn to naturally recognize that when your Australian friend tells you it's <b>40°C</b> outside on New Year's Day you'll know to <i>not</i> suggest she get the hot cocoa out but instead remind her to drink lots of water! That is the goal of {SITE_NAME}.
          </p>
        </React.Fragment>
      ),
    },
  },
  {
    key: "metric",
    title: {
      content: (
        <span style={style}>I already know the Metric System! Can {SITE_NAME} teach me US units?</span>
      ),
    },
    content: {
      content: (
        <React.Fragment>
          <p>
            <b>Yes!</b> {SITE_NAME} can help you by teaching you the US Customary Unit system. Simply set your profile to say that you prefer the Metric System when enrolling and you'll be given questions more appropriate to your needs!
          </p>

          <p>
            So, if you're going to the United States you can use {SITE_NAME} to prepare you if you want to be able to read weather forecasts in Fahrenheit, understand distances in miles, or follow speed limit signs!
          </p>

          <p>
            If you're going to the United Kingdom you should take a moment to note that the Imperial system used in the UK has different units for volume. Imperial units for volume are <u>not</u> taught on {SITE_NAME}. Read more <Link to="/docs/uscustomary/liquid">here</Link>.
          </p>
        </React.Fragment>
      ),
    },
  },
];
