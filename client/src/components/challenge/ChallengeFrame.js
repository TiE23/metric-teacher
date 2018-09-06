import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

const ChallengeFrame = props => (
  <Segment>
    {props.children}
  </Segment>
);

ChallengeFrame.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChallengeFrame;
