import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import UserDetailBasicsEditorForm from "./UserDetailBasicsEditorForm";

import {
  UPDATE_USER_PROFILE_MUTATION,
} from "../../../graphql/Mutations";

const UserDetailBasicsEditor = (props) => {
  if (!props.queryData || !props.query) return null;

  const { user } = props.queryData.data;

  return (
    <Mutation
      mutation={UPDATE_USER_PROFILE_MUTATION}
      update={(cache, { data: { updateUserProfile } }) => {
        const data = cache.readQuery({
          query: props.query,
          variables: { userid: user.id },
        });
        data.user = { ...data.user, ...updateUserProfile };
        cache.writeQuery({
          query: props.query,
          variables: { userid: user.id },
          data,
        });
      }}
    >
      {(updateUserProfile, { loading, error }) => (
        <UserDetailBasicsEditorForm
          initUserData={user}
          onSubmit={variables => updateUserProfile({
            variables: { ...variables, userid: user.id },
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
  queryData: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  query: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  closeEditor: PropTypes.func,
};

UserDetailBasicsEditor.defaultProps = {
  queryData: null,
  query: null,
  closeEditor: null,
};

export default UserDetailBasicsEditor;
