import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import map from "lodash/map";
import filter from "lodash/filter";
import uniq from "lodash/uniq";
import cloneDeep from "lodash/cloneDeep";
import forEach from "lodash/forEach";
import size from "lodash/size";

import utils from "../../../utils";

import ChallengeKickoffSelectorSubject from "./ChallengeKickoffSelectorSubject";

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
    const subjectsDataLength = size(this.state.subjectsData);

    if (subjectsDataLength) {
      const subjectSelectorComponents = map(this.state.subjectsData, subjectData => (
        <ChallengeKickoffSelectorSubject
          subjectData={subjectData}
          handleSubjectCheck={this.handleSubjectCheck}
          handleSubSubjectCheck={this.handleSubSubjectCheck}
          selectedSubSubjectIds={this.props.selectedSubSubjectIds}
        />
      ));

      const gridRows = [];
      for (let subjectNumber = 0; subjectNumber < subjectsDataLength; subjectNumber += 2) {
        gridRows.push(
          <Grid.Row
            key={`row_${(subjectNumber / 2) + 1}`}
          >
            <Grid.Column>
              {subjectSelectorComponents[subjectNumber] || null}
            </Grid.Column>
            <Grid.Column>
              {subjectSelectorComponents[subjectNumber + 1] || null}
            </Grid.Column>
          </Grid.Row>,
        );
      }
      return (
        <Grid
          stackable
          columns="equal"
          padded={false}
        >
          {gridRows}
        </Grid>
      );
    }

    return (
      <p>
        You have no SubSubjects to choose from.
        Activate your Masteries in your
        <Link to="/me">User Profile</Link>
        or assign new Subjects to your account by visiting the
        <Link to="/subjects">Subjects Page</Link>.
      </p>
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
  selectedSubSubjectIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateSubSubjectIds: PropTypes.func.isRequired,
};

ChallengeKickoffSelector.defaultProps = {
  masteriesData: null,
};

export default ChallengeKickoffSelector;
