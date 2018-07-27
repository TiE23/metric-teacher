import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";

const Subject = props =>  (
  <Item.Group>
    <Item>
      <Item.Image size="small" src={props.subjectData.media || "/img/placeholder.png"} />
      <Item.Content>
        <Item.Header>{props.subjectData.name}</Item.Header>
        <Item.Description>
          {props.subjectData.description}
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
