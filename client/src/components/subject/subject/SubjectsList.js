import React from "react";
import PropTypes from "prop-types";
import { Accordion, Segment } from "semantic-ui-react";

import Subject from "./Subject";
import SubSubjectsList from "../subsubject/SubSubjectsList";

const SubjectsList = (props) => {
  if (!props.subjectsData) return null;

  // There are two display options.
  // If prop 'compactView' is set it'll show a more compact Accordion list.
  if (props.compactView) {
    const subjectPanels = props.subjectsData.map(subjectData => (
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
        defaultActiveIndex={props.defaultActiveIndex}
        panels={subjectPanels}
        styled
      />
    );

  // When set to false (the default) it'll show a series of Segments with SubSubjectsList hidden
  // under a single Accordion component.
  } else {
    return (
      props.subjectsData.map(subjectData => (
        <Segment
          key={subjectData.id}
          attached
        >
          <Subject subjectData={subjectData} />
          <Accordion
            defaultActiveIndex={-1}
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
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
  defaultActiveIndex: PropTypes.number,
  compactView: PropTypes.bool,
};

SubjectsList.defaultProps = {
  subjectsData: null,
  queryInfo: null,
  defaultActiveIndex: -1,
  compactView: false,
};

export default SubjectsList;
