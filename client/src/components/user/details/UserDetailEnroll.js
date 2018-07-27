import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../../utils";

import LoadingButton from "../../misc/LoadingButton";

import {
  ENROLL_STUDENT_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailEnroll = props => (
  <Mutation
    mutation={ENROLL_STUDENT_MUTATION}
    update={(cache, { data: { enrollStudent } }) => {
      const data = cache.readQuery(props.queryInfo);
      utils.cacheNewObject(data, props.studentId, "enrollment", enrollStudent);
      cache.writeQuery({
        ...props.queryInfo,
        data,
      });
    }}
  >
    {(enrollStudent, { loading, error }) => (
      <LoadingButton
        onClick={() => enrollStudent({ variables: { studentid: props.studentId } })}
        loading={loading}
        error={error}
        buttonText="Enroll Now"
        buttonProps={{ primary: true }}
      />
    )}
  </Mutation>
);

UserDetailEnroll.propTypes = {
  studentId: PropTypes.string.isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailEnroll;
