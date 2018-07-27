import React from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";

import utils from "../../../utils";

import MasteriesList from "../../mastery/MasteriesList";
import SubjectsList from "../../subject/SubjectsList";

const UserDetailMasteries = (props) => {
  if (props.masteries.length) {
    if (props.organizeBySubject) {
      // Sort Subjects by ID, ascending.
      const subjectsTree = sortBy(reverseMasteriesData(props.masteries), ["id"]);

      // Sort SubSubjects by ID, ascending.
      subjectsTree.forEach((subject) => {
        // eslint-disable-next-line no-param-reassign
        subject.subSubjects = sortBy(subject.subSubjects, ["id"]);
      });

      return (
        <SubjectsList
          subjectsData={subjectsTree}
          queryInfo={props.queryInfo}
          compactView={props.subjectCompactView}
          accordionProps={{ fluid: true }}
        />
      );
    } else {
      return (
        <MasteriesList
          masteriesData={props.masteries}
          queryInfo={props.queryInfo}
          accordionProps={{ fluid: true }}
        />
      );
    }
  } else {
    return (
      <p>No masteries!</p>
    );
  }
};


/**
 * Flips Masteries>SubSubjects>Subject to Subject>SubSubjects>Masteries as efficiently as possible.
 * @param masteriesData
 * @returns {Array}
 */
const reverseMasteriesData = (masteriesData) => {
  const temp = {
    id: "root",
    subjects: [],
  };

  masteriesData.forEach((masteryData) => {
    // Make shallow copies of each object.
    const subjectShallowData = utils.rootCopy(masteryData.subSubject.parent);
    const subSubjectShallowData = utils.rootCopy(masteryData.subSubject);
    const masteryShallowData = utils.rootCopy(masteryData);

    if (!utils.cacheTargetExists(temp, subjectShallowData.id)) {
      utils.cachePushIntoArray(temp, "root", "subjects", subjectShallowData);
    }
    if (!utils.cacheTargetExists(temp, subSubjectShallowData.id)) {
      utils.cacheNewObject(temp, subjectShallowData.id, "subSubjects", [subSubjectShallowData], true);
    }
    if (!utils.cacheTargetExists(temp, masteryShallowData.id)) {
      utils.cacheNewObject(temp, subSubjectShallowData.id, "masteries", [masteryShallowData], true);
    }
  });

  return temp.subjects;
};


UserDetailMasteries.propTypes = {
  masteries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    subSubject: PropTypes.object,
  })).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  organizeBySubject: PropTypes.bool,
  subjectCompactView: PropTypes.bool,
};

UserDetailMasteries.defaultProps = {
  organizeBySubject: false,
  subjectCompactView: false,
};

export default UserDetailMasteries;
