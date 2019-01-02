/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import ScrollToTopOnMount from "../ScrollToTopOnMount";

import VideoDemos from "./VideoDemos";
import PersonalIntroduction from "./PersonalIntroduction";
import Inspiration from "./Inspiration";
import ThankYou from "./ThankYou";
import { Educational, Technical } from "../credits/Stats";
import Technology from "../credits/Technology";

import {
  PAGE_ICON_COLOR_DEMO,
  PAGE_TITLE_HEADER_SIZE,
  SITE_NAME,
} from "../../../constants";

const DemoPage = props => (
  <Container text>
    <ScrollToTopOnMount />
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Header.Content>
        <Icon name="bullhorn" color={PAGE_ICON_COLOR_DEMO} />
        {props.mode === "educator" && "Introducing "}
        {SITE_NAME}
        {props.mode === "recruiter" && " Demonstration"}
        <Header.Subheader>
          {props.mode === "recruiter" && "For your consideration."}
          {props.mode === "educator" && "A quick introduction."}
        </Header.Subheader>
      </Header.Content>
    </Header>

    <Header as="h2" content="Demos" dividing />

    <p>See all of {SITE_NAME} without having to use it!</p>

    <VideoDemos mode={props.mode} />

    {props.mode === "recruiter" &&
      <React.Fragment>
        <Header as="h2" content="A Personal Introduction" dividing />
        {PersonalIntroduction}
      </React.Fragment>
    }

    <Header as="h2" content={`The Inspiration Behind ${SITE_NAME}`} dividing />
    {props.mode === "educator" &&
      <p>
        Hello! I'm Kyle Geib and I want to tell you a little bit about the ideas behind {SITE_NAME}.
      </p>
    }
    {Inspiration}

    {props.mode === "recruiter" &&
      <React.Fragment>
        <Header as="h2" content={`The Technology Behind ${SITE_NAME}`} dividing />
        {Technology}
      </React.Fragment>
    }

    <Header as="h2" content={`The Stats of ${SITE_NAME}`} dividing />
    {props.mode === "recruiter" &&
      <React.Fragment>
        {Technical}
      </React.Fragment>
    }
    {props.mode === "educator" &&
      <React.Fragment>
        {Educational}
      </React.Fragment>
    }

    {props.mode === "recruiter" &&
      <React.Fragment>
        <Header as="h2" content="Thank You" dividing />
        {ThankYou}
      </React.Fragment>
    }

    {props.mode === "educator" &&
      <React.Fragment>
        <Header as="h2" content="More Information" dividing />
        <p>
          You can discover a little more about the site and the people behind it, including contact information, <Link to="/credits">here</Link>.
        </p>
      </React.Fragment>
    }
  </Container>
);

DemoPage.propTypes = {
  mode: PropTypes.string,
};

DemoPage.defaultProps = {
  mode: "recruiter",
};

export default DemoPage;
