import React from "react";
import PropTypes from "prop-types";
import { Accordion, Segment } from "semantic-ui-react";
import cloneDeep from "lodash/cloneDeep";

import utils from "../../utils";

import Subject from "./Subject";
import SubSubjectsList from "../subsubject/SubSubjectsList";

const SubjectsList = (props) => {
  if (!props.subjectsData) return null;

  let subjectsData;

  // If there are masteries passed through, add them to each matching SubSubject.
  if (props.masteriesData && props.masteriesData.length) {
    // Must create a clone as the original props object is marked as "not-extensible".
    subjectsData = cloneDeep(props.subjectsData);

    props.masteriesData.forEach((masteryData) => {
      utils.cachePushIntoArray(
        subjectsData,
        masteryData.subSubject.id,
        "masteries",
        masteryData,
      );
    });
  } else {
    // To save some speed let's not use deepClone.
    subjectsData = props.subjectsData;  // eslint-disable-line prefer-destructuring
  }

  // There are two display options.
  // If prop 'compactView' is set it'll show a more compact Accordion list.
  if (props.compactView) {
    const subjectPanels = subjectsData.map(subjectData => (
      {
        key: subjectData.id,
        title: subjectData.name,
        content: {
          content: (
            <div>
              <Subject subjectData={subjectData} />
              <SubSubjectsList
                subSubjectsData={subjectData.subSubjects}
                queryInfo={props.queryInfo}
              />
            </div>
          ),
          key: subjectData.id,
        },
      }
    ));

    return (
      <Accordion
        panels={subjectPanels}
        styled
        {...props.accordionProps}
      />
    );

  // When set to false (the default) it'll show a series of Segments with SubSubjectsList hidden
  // under a single Accordion component.
  } else {
    return (
      subjectsData.map(subjectData => (
        <Segment
          key={subjectData.id}
          attached
        >
          <Subject subjectData={subjectData} />
          <Accordion
            panels={[{
              key: subjectData.id,
              title: "Sub-Subjects Available",
              content: {
                content: (
                  <SubSubjectsList
                    subSubjectsData={subjectData.subSubjects}
                    queryInfo={props.queryInfo}
                  />
                ),
                key: subjectData.id,
              },
            }]}
            styled
            {...props.accordionProps}
          />
        </Segment>
      ))
    );
  }
};

SubjectsList.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    measurementDescription: PropTypes.string.isRequired,
    subSubjects: PropTypes.array.isRequired,
  })),
  // For use with Subjects component. UserDetailMasteries fills subjectsData with masteriesData.
  masteriesData: PropTypes.arrayOf(PropTypes.shape({
    subSubject: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  })),
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
  compactView: PropTypes.bool,
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SubjectsList.defaultProps = {
  subjectsData: null,
  masteriesData: null,
  queryInfo: null,
  compactView: false,
  accordionProps: null,
};

export default SubjectsList;
