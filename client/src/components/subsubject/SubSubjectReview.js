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
        <List.Icon
          name={SUBJECT_ICONS[props.subjectName] || "remove"}
          size="large"
          verticalAlign="top"
        />
        <List.Content>
          <List.Header>{props.subjectSelector || "Subject"}</List.Header>
          <List.Description>
            {props.subjectName || "..."}
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="expand arrows alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>{props.scaleSelector || "Scale"}</List.Header>
          <List.Description>
            {(props.scale && utils.firstLetterCap(props.scale)) || "..."}
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="sync alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>{props.toMetricSelector || "Direction"}</List.Header>
          <List.Description>
            {props.toMetric !== null ?
              props.toMetric ?
                <span>Imperial <Icon fitted name="long arrow alternate right" /> Metric</span>
                :
                <span>Metric <Icon fitted name="long arrow alternate right" /> Imperial</span>
              : <span>...</span>
            }
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="book" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>SubSubject ID</List.Header>
          <List.Description>{props.id || "..."}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="gem" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Rarity</List.Header>
          <List.Description>
            {(props.rarity !== null && `${props.rarity}`) || "..."}
          </List.Description>
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
  subjectSelector: PropTypes.node,
  scaleSelector: PropTypes.node,
  toMetricSelector: PropTypes.node,
};

SubSubjectReview.defaultProps = {
  id: null,
  subjectName: null,
  scale: null,
  toMetric: null,
  rarity: null,
  subjectSelector: null,
  scaleSelector: null,
  toMetricSelector: null,
};

export default SubSubjectReview;
