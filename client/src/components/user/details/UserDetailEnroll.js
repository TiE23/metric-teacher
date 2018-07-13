import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import {
  ENROLL_STUDENT_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailEnroll = (props) => {
  return (
    <Mutation
      mutation={ENROLL_STUDENT_MUTATION}
      update={(cache, { data: { enrollStudent } }) => {
        const data = cache.readQuery({
          query: props.userQuery,
          variables: { userid: props.studentId },
        });
        data.user.enrollment = enrollStudent;
        cache.writeQuery({
          query: props.userQuery,
          variables: { userid: props.studentId },
          data,
        });
      }}
    >
      {enrollStudent => (
        <button onClick={(e) => {
          e.preventDefault();
          enrollStudent({ variables: { studentid: props.studentId } });
        }}
        >
          Enroll now! (Click once!)
        </button>
      )}
    </Mutation>
  );
};

UserDetailEnroll.propTypes = {
  userQuery: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
};

export default UserDetailEnroll;
