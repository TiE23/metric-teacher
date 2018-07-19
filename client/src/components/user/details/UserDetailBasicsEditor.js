import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import UserDetailBasicsEditorForm from "./UserDetailBasicsEditorForm";

import {
  UPDATE_USER_PROFILE_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailBasicsEditor = (props) => {
  if (!props.userData || !props.query) return null;

  const { userData } = props;

  return (
    <Mutation
      mutation={UPDATE_USER_PROFILE_MUTATION}
      update={(cache, { data: { updateUserProfile } }) => {
        const data = cache.readQuery({
          query: props.query,
          variables: { userid: userData.id },
        });
        data.user = { ...data.user, ...updateUserProfile };
        cache.writeQuery({
          query: props.query,
          variables: { userid: userData.id },
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
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  closeEditor: PropTypes.func,
};

UserDetailBasicsEditor.defaultProps = {
  userData: null,
  query: null,
  closeEditor: null,
};

export default UserDetailBasicsEditor;
