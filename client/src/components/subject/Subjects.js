import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../QueryHandler";
import SubjectsList from "./subject/SubjectsList";

import {
  SUBJECT_DETAILS_PUBLIC_QUERY,
  SUBJECT_DETAILS_STUDENT_QUERY,
} from "../../graphql/Queries";

const Subjects = (props) => {
  const query = props.studentId ? SUBJECT_DETAILS_STUDENT_QUERY : SUBJECT_DETAILS_PUBLIC_QUERY;

  return (
    <Query
      query={query}
      variables={{ studentid: props.studentId }}
    >
      {queryProps => (
        <QueryHandler
          queryData={queryProps}
          query={query}
        >
          <SubjectsList
            subjectsData={queryProps.data.subjectSearch}
            queryInfo={{ query, variables: queryProps.variables }}
            studentId={props.studentId}
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
