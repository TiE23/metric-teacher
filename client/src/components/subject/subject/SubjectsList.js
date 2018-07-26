import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import Subject from "./Subject";

const SubjectsList = (props) => {
  if (!props.subjectsData) return null;

  const subjectPanels = props.subjectsData.map(subjectData => (
    {
      key: subjectData.id,
      title: subjectData.name,
      content: { content: (<Subject subjectData={subjectData} queryInfo={props.queryInfo} />) },
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
