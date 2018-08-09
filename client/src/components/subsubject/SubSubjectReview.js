import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";

import utils from "../../utils";

import {
  SUBJECT_ICONS,
} from "../../constants";

const SubSubjectReview = (props) => {
  if (!props.subSubjectData) return null;

  return (
    <List divided>
      <List.Item>
        <List.Icon name="book" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>SubSubject ID</List.Header>
          <List.Description>{props.subSubjectData.id}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon
          name={SUBJECT_ICONS[props.subSubjectData.parent.name] || "remove"}
          size="large"
          verticalAlign="top"
        />
        <List.Content>
          <List.Header>Subject</List.Header>
          <List.Description>{props.subSubjectData.parent.name}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="expand arrows alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Scale</List.Header>
          <List.Description>{utils.firstLetterCap(props.subSubjectData.scale)}</List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="sync alternate" size="large" verticalAlign="top" />
        <List.Content>
          <List.Header>Direction</List.Header>
          <List.Description>
            {props.subSubjectData.toMetric ?
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
          <List.Description>{props.subSubjectData.rarity}</List.Description>
        </List.Content>
      </List.Item>
    </List>
  );
};

SubSubjectReview.propTypes = {
  subSubjectData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    toMetric: PropTypes.bool.isRequired,
    rarity: PropTypes.number.isRequired,
    scale: PropTypes.string.isRequired,
    parent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

SubSubjectReview.defaultProps = {
  subSubjectData: null,
};

export default SubSubjectReview;
