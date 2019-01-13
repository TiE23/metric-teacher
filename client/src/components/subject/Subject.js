import React from "react";
import PropTypes from "prop-types";
import { Header, Icon, Item } from "semantic-ui-react";

import DocumentationSubjectModal from "../documentation/DocumentationSubjectModal";

import {
  SUBJECT_ICONS,
} from "../../constants";

const Subject = props => (
  <Item.Group>
    <Item>
      <Item.Image
        size="large"
        src={`/img/subjects/${props.subjectData.media}` || "/img/placeholder.png"}
      />
      <Item.Content>
        <Item.Header as={Header}>
          <Icon
            name={SUBJECT_ICONS[props.subjectData.name].icon}
            color={SUBJECT_ICONS[props.subjectData.name].color}
          />
          {props.subjectData.name}
        </Item.Header>
        <Item.Description>
          <p>{props.subjectData.description}</p>
          <p style={{ color: "teal" }}>
            <Icon name="book" /> {" "}
            <DocumentationSubjectModal subject={props.subjectData.name} toMetric>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                To Metric
              </span>
            </DocumentationSubjectModal>
            {" | "}
            <DocumentationSubjectModal subject={props.subjectData.name} toMetric={false}>
              <span style={{ textDecoration: "underline", cursor: "pointer" }}>
                From Metric
              </span>
            </DocumentationSubjectModal>
          </p>
        </Item.Description>
        <Item.Extra>
          <b>Did you know?</b>{props.subjectData.measurementDescription}
        </Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
);

Subject.propTypes = {
  subjectData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    measurementDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    media: PropTypes.string,
  }).isRequired,
};

export default Subject;
