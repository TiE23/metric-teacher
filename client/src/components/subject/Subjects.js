import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../QueryHandler";
import SubjectsList from "./SubjectsList";

import {
  SUBJECT_DETAILS_QUERY,
  SUBJECT_AND_MASTERY_DETAILS_QUERY,
} from "../../graphql/Queries";

const Subjects = (props) => {
  const query = props.studentId ?
    SUBJECT_AND_MASTERY_DETAILS_QUERY : SUBJECT_DETAILS_QUERY;

  return (
    <Query
      query={query}
      variables={{ studentid: props.studentId }}  // This is ignored for Subject-only query.
    >
      {queryProps => (
        <QueryHandler
          queryData={queryProps}
          query={query}
        >
          <SubjectsList
            subjectsData={queryProps.data && queryProps.data.allSubjects}
            masteriesData={queryProps.data && queryProps.data.activeMasteries}
            queryInfo={{ query, variables: queryProps.variables }}
            compactView
          />
        </QueryHandler>
      )}
    </Query>
  );
};

Subjects.propTypes = {
  studentId: PropTypes.string,
};

Subjects.defaultProps = {
  studentId: null,
};

export default Subjects;
