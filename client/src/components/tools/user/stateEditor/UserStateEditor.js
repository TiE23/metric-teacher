import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../../../utils";

import UserStateEditorForm from "./UserStateEditorForm";

import {
  UPDATE_USER_STATES,
} from "../../../../graphql/Mutations";


// TODO Cache updating currently isn't working and I have no clue why...
const UserStateEditor = props => (
  <Mutation
    mutation={UPDATE_USER_STATES}
    update={(cache, { data: { updateUserStates } }) => {
      // Updating cache's User row if queryInfo was passed in.
      if (props.queryInfo) {
        const data = cache.readQuery(props.queryInfo);
        utils.cacheUpdateObject(data, updateUserStates.id, updateUserStates);
        cache.writeQuery({
          ...props.queryInfo,
          data,
        });
      }
    }}
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
  queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

UserStateEditor.defaultProps = {
  queryInfo: null,
};

export default UserStateEditor;
