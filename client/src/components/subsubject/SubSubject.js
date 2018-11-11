import React from "react";
import PropTypes from "prop-types";
import { Icon, Segment } from "semantic-ui-react";

import DocumentationSubjectModal from "../documentation/DocumentationSubjectModal";

const SubSubject = props => (
  <Segment attached>
    <p>
      {props.description}
      <br />
      <Icon name="book" color="teal" />
      <DocumentationSubjectModal subject={props.subjectName} toMetric={props.toMetric}>
        <span style={{ color: "teal", textDecoration: "underline", cursor: "pointer" }}>
          Documentation
        </span>
      </DocumentationSubjectModal>
    </p>
  </Segment>
);

SubSubject.propTypes = {
  description: PropTypes.string.isRequired,
  subjectName: PropTypes.string.isRequired,
  toMetric: PropTypes.bool.isRequired,
};

export default SubSubject;
