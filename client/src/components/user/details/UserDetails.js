import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import UserDetailBasics from "./UserDetailBasics";
import UserDetailBasicsEditor from "./UserDetailBasicsEditor";
import UserDetailEnrollment from "./UserDetailEnrollment";

import { USER_DETAILS_QUERY } from "../../../graphql/Queries";

class UserDetails extends PureComponent {
  state = {
    editUserDetailBasics: false,
  };

  openUserDetailBasicsEditor = () => {
    this.setState({ editUserDetailBasics: true });
  };

  closeUserDetailBasicsEditor = () => {
    this.setState({ editUserDetailBasics: false });
  };

  render() {
    return (
      <Query
        query={USER_DETAILS_QUERY}
        variables={{ userid: this.props.userId }}
        fetchPolicy="network-only"  // Always have the freshest data available.
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
            query={USER_DETAILS_QUERY}
          >
            {this.state.editUserDetailBasics ?
              <UserDetailBasicsEditor
                userData={queryProps.data.user}
                queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
                closeEditor={this.closeUserDetailBasicsEditor}
              />
              :
              <UserDetailBasics
                userData={queryProps.data.user}
                queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
                openEditor={this.openUserDetailBasicsEditor}
              />
            }
            <UserDetailEnrollment
              userData={queryProps.data.user}
              queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
            />
          </QueryHandler>
        )}
      </Query>
    );
  }
}

UserDetails.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default UserDetails;
