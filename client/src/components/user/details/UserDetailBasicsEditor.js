import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../../utils";

import UserDetailBasicsEditorForm from "./UserDetailBasicsEditorForm";

import {
  UPDATE_USER_PROFILE_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailBasicsEditor = (props) => {
  if (!props.userData) return null;

  const { userData } = props;

  return (
    <Mutation
      mutation={UPDATE_USER_PROFILE_MUTATION}
      update={(cache, { data: { updateUserProfile } }) => {
        const data = cache.readQuery(props.queryInfo);
        data.user = { ...data.user, ...updateUserProfile };
        cache.writeQuery({
          ...props.queryInfo,
          data,
        });
      }}
    >
      {(updateUserProfile, { loading, error }) => (
        <UserDetailBasicsEditorForm
          initUserData={userData}
          onSubmit={variables => updateUserProfile({
            variables: { ...variables, userid: userData.id },
          })}
          closeEditor={props.closeEditor}
          loading={loading}
          error={error}
        />
      )}
    </Mutation>
  );
};

UserDetailBasicsEditor.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  closeEditor: PropTypes.func,
};

UserDetailBasicsEditor.defaultProps = {
  userData: null,
  closeEditor: null,
};

export default UserDetailBasicsEditor;
