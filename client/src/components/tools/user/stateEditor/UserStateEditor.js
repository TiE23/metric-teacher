import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import UserStateEditorForm from "./UserStateEditorForm";

import {
  UPDATE_USER_STATES,
} from "../../../../graphql/Mutations";

const UserStateEditor = props => (
  <Mutation
    mutation={UPDATE_USER_STATES}
  >
    {(updateUserStates, { loading, error, data }) => (
      <UserStateEditorForm
        initType={props.userType}
        initStatus={props.userStatus}
        initFlags={props.userFlags}
        onSubmit={variables => updateUserStates({
          variables: { ...variables, userid: props.userId },
        })}
        loading={loading}
        error={error}
        success={data && data.updateUserStates && !!data.updateUserStates.id}
      />
    )}
  </Mutation>
);

UserStateEditor.propTypes = {
  userId: PropTypes.string.isRequired,
  userType: PropTypes.number.isRequired,
  userStatus: PropTypes.number.isRequired,
  userFlags: PropTypes.number.isRequired,
};

export default UserStateEditor;
