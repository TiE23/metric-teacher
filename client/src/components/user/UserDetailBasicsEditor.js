import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Icon, Header, Segment } from "semantic-ui-react";

import utils from "../../utils";

import UserDetailBasicsEditorForm from "./UserDetailBasicsEditorForm";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_PROFILE,
} from "../../constants";
import {
  UPDATE_USER_PROFILE_MUTATION,
} from "../../graphql/Mutations";

const UserDetailBasicsEditor = (props) => {
  if (!props.userData) return null;

  const { userData } = props;

  return (
    <Mutation
      mutation={UPDATE_USER_PROFILE_MUTATION}
      update={(cache, { data: { updateUserProfile } }) => {
        const data = cache.readQuery(props.queryInfo);
        utils.cacheUpdateObject(data, userData.id, updateUserProfile);
        cache.writeQuery({
          ...props.queryInfo,
          data,
        });
      }}
    >
      {(updateUserProfile, { loading, error }) => (
        <Segment>
          <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
            <Icon name="edit" color={PAGE_ICON_COLOR_PROFILE} />
            Update Your Information
          </Header>
          <UserDetailBasicsEditorForm
            initUserData={userData}
            onSubmit={variables => updateUserProfile({
              variables: { ...variables, userid: userData.id },
            })}
            closeEditor={props.closeEditor}
            loading={loading}
            error={error}
          />
        </Segment>
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
