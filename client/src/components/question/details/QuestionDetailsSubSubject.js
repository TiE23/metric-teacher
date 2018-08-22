import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import QuestionDetailsSubSubjectsSelector from "./QuestionDetailsSubSubjectsSelector";
import SubSubjectReview from "../../subsubject/SubSubjectReview";

import {
  SUBJECT_DETAILS_PARENT_ID_QUERY,
  SUBSUBJECT_DETAILS_QUERY,
} from "../../../graphql/Queries";

const QuestionDetailsSubSubject = props => (
  <div>
    {props.editMode ?
      <Query
        query={SUBJECT_DETAILS_PARENT_ID_QUERY}
      >
        {queryProps => (
          <QueryHandler queryData={queryProps}>
            <QuestionDetailsSubSubjectsSelector
              subjectsData={queryProps.data && queryProps.data.allSubjects}
              initialSubSubjectId={props.subSubjectId}
              handleSubSubjectChange={props.handleSubSubjectChange}
            />
          </QueryHandler>
        )}
      </Query>
      : props.subSubjectId ?
        <Query
          query={SUBSUBJECT_DETAILS_QUERY}
          variables={{ subsubjectid: props.subSubjectId }}
        >
          {queryProps => (
            <QueryHandler
              queryData={queryProps}
              noDataErrorMessage="SubSubject not found."
            >
              {(queryProps.data && queryProps.data.subSubject) ?
                <SubSubjectReview
                  id={queryProps.data.subSubject.id}
                  subjectName={queryProps.data.subSubject.parent.name}
                  scale={queryProps.data.subSubject.scale}
                  toMetric={queryProps.data.subSubject.toMetric}
                  description={queryProps.data.subSubject.description}
                  rarity={queryProps.data.subSubject.rarity}
                /> : <p>SubSubject not found.</p>
              }
            </QueryHandler>
          )}
        </Query>
        :
        <p>No SubSubjectId given.</p>
    }
  </div>
);

QuestionDetailsSubSubject.propTypes = {
  subSubjectId: PropTypes.string,
  editMode: PropTypes.bool,
  handleSubSubjectChange: PropTypes.func,
};

QuestionDetailsSubSubject.defaultProps = {
  editMode: false,
  handleSubSubjectChange: null,
};

export default QuestionDetailsSubSubject;
