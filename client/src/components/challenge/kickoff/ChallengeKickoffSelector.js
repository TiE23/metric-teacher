import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Checkbox } from "semantic-ui-react";
import map from "lodash/map";
import filter from "lodash/filter";
import uniq from "lodash/uniq";
import cloneDeep from "lodash/cloneDeep";
import forEach from "lodash/forEach";

import utils from "../../../utils";

class ChallengeKickoffSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      subjectsData: {},
    };


    /**
     * Initializing function that runs on Component mount. Constructs the state for subjectsData
     * that contains the data needed to build the checkboxes.
     * @param masteriesData
     */
    const buildSubjectsData = (masteriesData) => {
      const subjectsData = {};

      masteriesData.forEach(({ subSubject }) => {
        if (!subjectsData[subSubject.parent.id]) {
          subjectsData[subSubject.parent.id] = {
            checkState: -1,  // -1 unchecked, 0 indeterminate, 1 checked
            ...utils.rootCopy(subSubject.parent),
            subSubjects: {},
          };
        }

        // Use utils.rootCopy() to copy only one level of the object (no children objects).
        subjectsData[subSubject.parent.id].subSubjects[subSubject.id] = utils.rootCopy(subSubject);
      });

      this.setState({ subjectsData });
    };


    /**
     * Scans through all Subjects and their SubSubjects to determine if the checkbox for the
     * SubjectData's state should be checked, unchecked, or indeterminate (a mix of
     * checked and unchecked SubSubjects).
     * @param subjectsData
     * @param selectedSubSubjectIds
     */
    const determineSubjectCheckStates = (subjectsData, selectedSubSubjectIds) => {
      const newSubjectsData = cloneDeep(subjectsData);

      // Loop through each Subject
      forEach(subjectsData, (subjectData, subjectId) => {
        let allChecked = true;
        let noneChecked = true;

        // Loop through each Subject's SubSubjects.
        forEach(subjectData.subSubjects, (subSubject, subSubjectId) => {
          if (selectedSubSubjectIds.includes(subSubjectId)) {
            noneChecked = false; // One was checked, this is now false!
          } else {
            allChecked = false; // One was unchecked, this is now false!
          }
        });

        if (allChecked && !noneChecked) {
          newSubjectsData[subjectId].checkState = 1;
        } else if (!allChecked && noneChecked) {
          newSubjectsData[subjectId].checkState = -1;
        } else {  // Both are false = indeterminate (or true - true: the Subject had no SubSubjects)
          newSubjectsData[subjectId].checkState = 0;
        }
      });

      this.setState({ subjectsData: newSubjectsData });
    };

    this.componentDidMount = () => {
      buildSubjectsData(this.props.masteriesData);
    };

    this.handleSubSubjectCheck = (event, { value, checked }) => {
      let updatedSelectedSubSubjectIds = cloneDeep(this.props.selectedSubSubjectIds);

      if (checked) {
        // Add the ID.
        updatedSelectedSubSubjectIds.push(value);
      } else {
        // Remove the ID.
        updatedSelectedSubSubjectIds = filter(
          updatedSelectedSubSubjectIds,
          subSubjectId => subSubjectId !== value,
        );
      }

      this.props.updateSubSubjectIds(uniq(updatedSelectedSubSubjectIds));
      determineSubjectCheckStates(this.state.subjectsData, updatedSelectedSubSubjectIds);
    };

    this.handleSubjectCheck = (event, { value, checked }) => {
      let updatedSelectedSubSubjectIds = cloneDeep(this.props.selectedSubSubjectIds);
      const allTargetedSubSubjectIds =
        map(this.state.subjectsData[value].subSubjects, subSubject => subSubject.id);

      if (checked) {
        // Add the IDs.
        updatedSelectedSubSubjectIds.push(...allTargetedSubSubjectIds);
      } else {
        // Remove the IDs.
        updatedSelectedSubSubjectIds = filter(
          updatedSelectedSubSubjectIds,
          subSubjectId => !allTargetedSubSubjectIds.includes(subSubjectId),
        );
      }

      this.props.updateSubSubjectIds(uniq(updatedSelectedSubSubjectIds));
      determineSubjectCheckStates(this.state.subjectsData, updatedSelectedSubSubjectIds);
    };
  }

  render() {
    return (
      <div>
        {this.state.subjectsData &&
        <List>
          {map(this.state.subjectsData, subject => (
            <List.Item key={subject.id}>
              <List.Icon name="folder" />
              <List.Content>
                <Checkbox
                  label={subject.name}
                  onChange={this.handleSubjectCheck}
                  value={subject.id}
                  checked={subject.checkState === 1}
                  indeterminate={subject.checkState === 0}
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
  selectedSubSubjectIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  updateSubSubjectIds: PropTypes.func.isRequired,
};

ChallengeKickoffSelector.defaultProps = {
  masteriesData: null,
};

export default ChallengeKickoffSelector;
