import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import LoadingButton from "../../misc/LoadingButton";

import {
  ENROLL_STUDENT_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailEnroll = props => (
  <Mutation
    mutation={ENROLL_STUDENT_MUTATION}
    update={(cache, { data: { enrollStudent } }) => {
      const data = cache.readQuery({
        query: props.query,
        variables: { userid: props.studentId },
      });
      data.user.enrollment = enrollStudent;
      cache.writeQuery({
        query: props.query,
        variables: { userid: props.studentId },
        data,
      });
    }}
  >
    {(enrollStudent, { loading, error }) => (
      <LoadingButton
        onClick={() => enrollStudent({ variables: { studentid: props.studentId } })}
        loading={loading}
        error={error}
        buttonText="Enroll"
      />
    )}
  </Mutation>
);

UserDetailEnroll.propTypes = {
  studentId: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetailEnroll;
