import React from "react";
import PropTypes from "prop-types";
import { Accordion, Header, Icon, Segment, Checkbox } from "semantic-ui-react";
import map from "lodash/map";
import sortBy from "lodash/sortBy";

import utils from "../../../utils";

const ChallengeKickoffSelectorSubject = (props) => {
  const selectionColor = props.subjectData.checkState === 0 ?
    "olive" : props.subjectData.checkState === 1 ?
      "green" : null;

  const selectionIcon = props.subjectData.checkState === 0 ?
    "dot circle outline" : props.subjectData.checkState === 1 ?
      "check circle outline" : "circle outline";

  const clickSubjectHeader = () => {
    props.handleSubjectCheck(null, {
      value: props.subjectData.id,
      checked: props.subjectData.checkState <= 0, // Emulate Checkbox behavior.
    });
  };

  return (
    <Segment color={selectionColor}>
      <Header
        style={{ cursor: "pointer" }}
        size="medium"
        onClick={clickSubjectHeader}
      >
        <Icon color={selectionColor} name={selectionIcon} />
        <Header.Content>
          {props.subjectData.name}
          <Header.Subheader>
            Click to include this subject.
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Accordion
        panels={[{
          key: "subsubjects_selections",
          title: "Customize",
          content: {
            content: (
              <ul>
                {map(sortBy(props.subjectData.subSubjects, ["id"]), subSubject => (
                  <li key={subSubject.id}>
                    <Checkbox
                      label={`${utils.firstLetterCap(subSubject.scale)}-scale - ${subSubject.toMetric ? "To Metric" : "From Metric"}`}
                      onChange={props.handleSubSubjectCheck}
                      value={subSubject.id}
                      checked={props.selectedSubSubjectIds.includes(subSubject.id)}
                    />
                  </li>
                ))}
              </ul>
            ),
          },
        }]}
      />
    </Segment>
  );
};

ChallengeKickoffSelectorSubject.propTypes = {
  subjectData: PropTypes.shape({
    checkState: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    media: PropTypes.string,
    name: PropTypes.string.isRequired,
    subSubjects: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  handleSubjectCheck: PropTypes.func.isRequired,
  handleSubSubjectCheck: PropTypes.func.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChallengeKickoffSelectorSubject;
