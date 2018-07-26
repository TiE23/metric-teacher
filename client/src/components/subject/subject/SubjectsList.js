import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import SubSubjectsList from "../subsubject/SubSubjectsList";

const SubjectsList = (props) => {
  if (!props.subjectsData) return null;

  const subjectPanels = props.subjectsData.map(subjectData => (
    {
      key: subjectData.id,
      title: subjectData.name,
      content: { content: (
        <div>
          <p>
            {subjectData.measurementDescription}
            <br />
            {subjectData.description}
          </p>
          <SubSubjectsList
            subSubjectsData={subjectData.subSubjects}
            queryInfo={props.queryInfo}
          />
        </div>
      ) },
    }
  ));

  return (
    <Accordion
      defaultActiveIndex={-1}
      panels={subjectPanels}
      styled
    />
  );
};

SubjectsList.propTypes = {
  subjectsData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    measurementDescription: PropTypes.string.isRequired,
  })),
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
};

SubjectsList.defaultProps = {
  subjectsData: null,
  queryInfo: null,
};

export default SubjectsList;
