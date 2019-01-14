import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";

import utils from "../../utils";

import {
  SUBJECT_ICONS,
  SCALE_ICONS,
} from "../../constants";

// TODO - Use Popup components to add scale descriptions
const SubSubjectReview = props => (
  <List divided>
    <List.Item>
      <List.Icon
        name={(props.subjectName && SUBJECT_ICONS[props.subjectName].icon) || "remove"}
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
      <List.Icon
        name={SCALE_ICONS[props.scale] || "expand arrows alternate"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>{props.scaleSelector || "Scale"}</List.Header>
        <List.Description>
          {(props.scale && utils.firstLetterCap(props.scale)) || "..."}
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={props.toMetric === null ? "circle outline" : "exchange"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>{props.toMetricSelector || "Direction"}</List.Header>
        <List.Description>
          {props.toMetric !== null ?
            <span>
              {props.toMetric ? "US Customary" : "Metric"}
              {" "}
              <Icon name="long arrow alternate right" />
              {props.toMetric ? "Metric" : "US Customary"}
            </span>
            : <span>...</span>
          }
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={props.id ? "file alternate" : "file alternate outline"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>SubSubject ID</List.Header>
        <List.Description>{props.id || "..."}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={props.description ? "comment alternate" : "comment alternate outline"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>Description</List.Header>
        <List.Description>{props.description || "..."}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={props.rarity !== null ? "gem" : "gem outline"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>Rarity</List.Header>
        <List.Description>
          {(props.rarity !== null && `${props.rarity}`) || "..."}
        </List.Description>
      </List.Content>
    </List.Item>
  </List>
);

SubSubjectReview.propTypes = {
  id: PropTypes.string,
  subjectName: PropTypes.string,
  scale: PropTypes.string,
  toMetric: PropTypes.bool,
  description: PropTypes.string,
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
  description: null,
  rarity: null,
  subjectSelector: null,
  scaleSelector: null,
  toMetricSelector: null,
};

export default SubSubjectReview;
