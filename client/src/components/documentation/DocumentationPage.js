import React from "react";
import PropTypes from "prop-types";
import { Container, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { compose } from "react-apollo";
import { withRouter } from "react-router";

import SignupLoginButtons from "../misc/SignupLoginButtons";
import DocumentationDisplay from "./DocumentationDisplay";

import Docs from "./DocumentationContent";
import ScrollTo from "../misc/ScrollTo";
import withAuth from "../AuthHOC";

import {
  SITE_NAME,
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_DOCUMENTATION,
} from "../../constants";

const DocumentationPage = (props) => {
  const params = props.match.params[0].slice(1).split("/");
  const sectionTarget = [];
  const paramSlug = [];

  if (params[0] === "all") {
    // Target all because it was asked for explicitly.
    paramSlug.push(...params.slice(1));  // Skip the first item
  } else if (params[0] === "1") {
    sectionTarget.push(...params.slice(1, 2)); // Target the first layer (h1).
    paramSlug.push(...params.slice(1));  // Skip the first item
  } else if (params[0] === "2") {
    sectionTarget.push(...params.slice(1, 3)); // Target the second layer (h2).
    paramSlug.push(...params.slice(1));  // Skip the first item
  } else {
    // Target all because we weren't sure.
    paramSlug.push(...params);
  }

  return (
    <React.Fragment>
      <ScrollTo paramSlug={paramSlug.join("/")} />
      <Container id="top">
        <Container text>
          <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
            <Header.Content>
              <Icon name="book" color={PAGE_ICON_COLOR_DOCUMENTATION} />
              Documentation
              <Header.Subheader>
                Everything you need to know.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Container>

        {(!props.userTokenData || !props.userTokenData.id) &&
        <Container text textAlign="center">
          <br />
          <Header size="small">
            Start learning on {SITE_NAME} today!
          </Header>
          <SignupLoginButtons from={props.location.pathname} />
          <br />
          <br />
        </Container>
        }

        <br />
        <DocumentationDisplay documents={Docs} sectionTarget={sectionTarget} />
        <br />

        <Link to="/docs" replace>Back to top.</Link>
      </Container>
    </React.Fragment>
  );
};

DocumentationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      0: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
};

DocumentationPage.defaultProps = {
  userTokenData: null,
};

export default compose(
  withRouter,
  withAuth,
)(DocumentationPage);
