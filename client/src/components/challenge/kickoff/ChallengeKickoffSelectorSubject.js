import React from "react";
import PropTypes from "prop-types";
import { Segment, Checkbox } from "semantic-ui-react";
import map from "lodash/map";

const ChallengeKickoffSelectorSubject = props => (
  <Segment>
    <Checkbox
      label={props.subjectData.name}
      onChange={props.handleSubjectCheck}
      value={props.subjectData.id}
      checked={props.subjectData.checkState === 1}
      indeterminate={props.subjectData.checkState === 0}
    />
    <ul>
      {map(props.subjectData.subSubjects, subSubject => (
        <li key={subSubject.id}>
          <Checkbox
            label={subSubject.name}
            onChange={props.handleSubSubjectCheck}
            value={subSubject.id}
            checked={props.selectedSubSubjectIds.includes(subSubject.id)}
          />
        </li>
      ))}
    </ul>
  </Segment>
);

ChallengeKickoffSelectorSubject.propTypes = {
  subjectData: PropTypes.shape({
    checkState: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    media: PropTypes.string,
    name: PropTypes.string.isRequired,
    subSubjects: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      scale: PropTypes.string.isRequired,
      toMetric: PropTypes.bool.isRequired,
    })).isRequired,
  }).isRequired,
  handleSubjectCheck: PropTypes.func.isRequired,
  handleSubSubjectCheck: PropTypes.func.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChallengeKickoffSelectorSubject;
