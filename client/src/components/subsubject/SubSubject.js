import React from "react";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";

const SubSubject = props => (
  <Segment attached>
    {props.subSubjectData.description}
  </Segment>
);

SubSubject.propTypes = {
  subSubjectData: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default SubSubject;
