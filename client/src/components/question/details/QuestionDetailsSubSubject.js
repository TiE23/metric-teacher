import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import QuestionDetailsSubSubjectsSelector from "./subsubjects/QuestionDetailsSubSubjectsSelector";
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
            />
          </QueryHandler>
        )}
      </Query>
      :
      <Query
        query={SUBSUBJECT_DETAILS_QUERY}
        variables={{ subsubjectid: props.subSubjectId }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
            noDataErrorMessage="SubSubject not found."
          >
            <SubSubjectReview
              subSubjectData={queryProps.data && queryProps.data.subSubject}
              queryInfo={{ SUBSUBJECT_DETAILS_QUERY, variables: queryProps.variables }}
            />
          </QueryHandler>
        )}
      </Query>
    }
  </div>
);

QuestionDetailsSubSubject.propTypes = {
  subSubjectId: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
};

QuestionDetailsSubSubject.defaultProps = {
  editMode: false,
};

export default QuestionDetailsSubSubject;
