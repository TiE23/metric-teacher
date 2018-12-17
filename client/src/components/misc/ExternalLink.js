import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

const ExternalLink = props => (
  <a
    href={props.to}
    target="_blank"
    rel="noopener noreferrer" // Provides security -> https://mathiasbynens.github.io/rel-noopener/
  >
    {props.children}&nbsp;<Icon name="external" size="small" fitted />
  </a>
);

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExternalLink;
