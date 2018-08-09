import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import SubSubjectReview from "../../subsubject/SubSubjectReview";

import {
  SUBSUBJECT_DETAILS_QUERY,
} from "../../../graphql/Queries";

const QuestionDetailsSubSubject = props => (
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
);

QuestionDetailsSubSubject.propTypes = {
  subSubjectId: PropTypes.string.isRequired,
};

export default QuestionDetailsSubSubject;
