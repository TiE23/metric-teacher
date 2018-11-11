import React from "react";
import PropTypes from "prop-types";
import sortBy from "lodash/sortBy";

import utils from "../../utils";

import MasteriesList from "../mastery/MasteriesList";
import SubjectsList from "../subject/SubjectsList";

const UserDetailMasteries = (props) => {
  if (props.masteriesData.length) {
    if (props.organizeBySubject) {
      // Sort Subjects by index, ascending.
      const subjectsTree = sortBy(invertMasteriesData(props.masteriesData), "index");

      // Sort SubSubjects by index, ascending.
      subjectsTree.forEach((subject) => {
        // eslint-disable-next-line no-param-reassign
        subject.subSubjects = sortBy(subject.subSubjects, "index");
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
          masteriesData={props.masteriesData}
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
const invertMasteriesData = (masteriesData) => {
  const temp = {
    id: "root",
    subjects: [],
  };

  masteriesData.forEach((masteryData) => {
    // Make root (no child objects) copies of each object.
    const subjectRootData = utils.rootCopy(masteryData.subSubject.parent);
    const subSubjectRootData = utils.rootCopy(masteryData.subSubject);
    subSubjectRootData.parent = masteryData.subSubject.parent; // For MasteryAndSubSubject.
    const masteryRootData = utils.rootCopy(masteryData);

    if (!utils.cacheTargetExists(temp, subjectRootData.id)) {
      utils.cachePushIntoArray(temp, "root", "subjects", subjectRootData);
    }
    if (!utils.cacheTargetExists(temp, subSubjectRootData.id)) {
      if (
        !utils.cacheNewObject(temp, subjectRootData.id, "subSubjects", [subSubjectRootData], true)
      ) {
        utils.cachePushIntoArray(temp, subjectRootData.id, "subSubjects", subSubjectRootData);
      }
    }
    if (!utils.cacheTargetExists(temp, masteryRootData.id)) {
      if (
        !utils.cacheNewObject(temp, subSubjectRootData.id, "masteries", [masteryRootData], true)
      ) {
        utils.cachePushIntoArray(temp, subSubjectRootData.id, "masteries", masteryRootData);
      }
    }
  });

  return temp.subjects;
};


UserDetailMasteries.propTypes = {
  masteriesData: PropTypes.arrayOf(PropTypes.shape({
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
