import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";

import utils from "../../utils";

import {
  SUBJECT_ICONS,
} from "../../constants";

const SubSubjectReview = (props) => {
  return (
    <List divided>
      <List.Item>
        <List.Icon name="book" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>SubSubject ID</List.Header>
          <List.Description>{props.id}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon
          name={SUBJECT_ICONS[props.subjectName] || "remove"}
          size="large"
          verticalAlign="top"
        />
        <List.Content>
          <List.Header>Subject</List.Header>
          <List.Description>{props.subjectName}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="expand arrows alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Scale</List.Header>
          <List.Description>{utils.firstLetterCap(props.scale)}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="sync alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Direction</List.Header>
          <List.Description>
            {props.toMetric === null ? null : props.toMetric ?
              <span>Imperial <Icon fitted name="long arrow alternate right" /> Metric</span> :
              <span>Metric <Icon fitted name="long arrow alternate right" /> Imperial</span>
            }
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="gem" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Rarity</List.Header>
          <List.Description>{props.rarity}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

SubSubjectReview.propTypes = {
  id: PropTypes.string,
  subjectName: PropTypes.string,
  scale: PropTypes.string,
  toMetric: PropTypes.bool,
  rarity: PropTypes.number,
};

SubSubjectReview.defaultProps = {
  id: null,
  subjectName: null,
  scale: null,
  toMetric: null,
  rarity: null,
};

export default SubSubjectReview;
