import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import {
  ENROLL_STUDENT_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailEnrollment = (props) => {
  return (
    <Mutation
      mutation={ENROLL_STUDENT_MUTATION}
      // update={}
    >
      {(EnrollStudent, { data }) => (
        <button onClick={(e) => {
          e.preventDefault();
          EnrollStudent({ variables: { studentid: props.studentId } });
        }}
        >
          Enroll now! (Click once!)
        </button>
      )}
    </Mutation>
  );
};

UserDetailEnrollment.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default UserDetailEnrollment;
