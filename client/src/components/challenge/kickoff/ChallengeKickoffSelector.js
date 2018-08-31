import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Checkbox } from "semantic-ui-react";
import map from "lodash/map";
import filter from "lodash/filter";
import uniq from "lodash/uniq";

import utils from "../../../utils";

class ChallengeKickoffSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      subjectsData: {},
    };

    const buildSubjectsData = (masteriesData) => {
      const subjectsData = {};

      masteriesData.forEach(({ subSubject }) => {
        if (!subjectsData[subSubject.parent.id]) {
          subjectsData[subSubject.parent.id] = {
            ...utils.rootCopy(subSubject.parent),
            subSubjects: {},
          };
        }
        // Use utils.rootCopy() to copy only one level of the object (no children objects).
        subjectsData[subSubject.parent.id].subSubjects[subSubject.id] = utils.rootCopy(subSubject);
      });

      this.setState({ subjectsData });
    };

    this.componentDidMount = () => {
      buildSubjectsData(this.props.masteriesData);
    };

    this.handleSubSubjectCheck = (event, { value, checked }) => {
      const { selectedSubSubjectIds } = this.props;
      if (checked) {
        selectedSubSubjectIds.push(value);
        this.props.updateSubSubjectIds(uniq(selectedSubSubjectIds));
      } else {
        this.props.updateSubSubjectIds(uniq(filter(
          selectedSubSubjectIds,
          subSubjectId => subSubjectId !== value,
        )));
      }
    };

    this.handleSubjectCheck = (event, { value, checked }) => {
      const { selectedSubSubjectIds } = this.props;
      const allSubSubjectIds =
        map(this.state.subjectsData[value].subSubjects, subSubject => subSubject.id);

      if (checked) {
        selectedSubSubjectIds.push(...allSubSubjectIds);
        this.props.updateSubSubjectIds(uniq(selectedSubSubjectIds));
      } else {
        this.props.updateSubSubjectIds(uniq(filter(
          selectedSubSubjectIds,
          subSubjectId => !allSubSubjectIds.includes(subSubjectId),
        )));
      }
    };
  }

  render() {
    return (
      <div>
        <p>ChallengeKickoffSelector</p>
        {this.state.subjectsData &&
        <List>
          {map(this.state.subjectsData, subject => (
            <List.Item key={subject.id}>
              <List.Icon name="folder" />
              <List.Content>
                {subject.name}
                <Checkbox
                  label="All"
                  onChange={this.handleSubjectCheck}
                  value={subject.id}
                  checked={false}
                />
                <Checkbox
                  label="None"
                  onChange={this.handleSubjectCheck}
                  value={subject.id}
                  checked
                />
                <List.List>
                  {map(subject.subSubjects, subSubject => (
                    <List.Item key={subSubject.id}>
                      <List.Icon name="file" />
                      <List.Content>
                        <Checkbox
                          label={subSubject.name}
                          onChange={this.handleSubSubjectCheck}
                          value={subSubject.id}
                          checked={this.props.selectedSubSubjectIds.includes(subSubject.id)}
                        />
                      </List.Content>
                    </List.Item>
                  ))}
                </List.List>
              </List.Content>
            </List.Item>
          ))}
        </List>
        }
      </div>
    );
  }
}

ChallengeKickoffSelector.propTypes = {
  masteriesData: PropTypes.arrayOf(PropTypes.shape({
    subSubject: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      scale: PropTypes.string.isRequired,
      toMetric: PropTypes.bool.isRequired,
      parent: PropTypes.shape({
        id: PropTypes.string.isRequired,
        media: PropTypes.string,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })),
  selectedSubSubjectIds: PropTypes.array.isRequired,  // eslint-disable-line react/forbid-prop-types
  updateSubSubjectIds: PropTypes.func.isRequired,
};

export default ChallengeKickoffSelector;
