import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query, Mutation } from "react-apollo";

import QueryHandler from "../../QueryHandler";
import UserDetailBasics from "./UserDetailBasics";
import UserDetailBasicsEditor from "./UserDetailBasicsEditor";
import UserDetailEnrollment from "./UserDetailEnrollment";

import { USER_DETAILS_QUERY } from "../../../graphql/Queries";

class UserDetails extends PureComponent {
  state = {
    editUserDetailBasics: false,
  };

  openUserDetailBasicsEditor() {
    this.setState({ editUserDetailBasics: true });
  }

  closeUserDetailBasicsEditor() {
    this.setState({ editUserDetailBasics: false });
  }

  render() {
    return (
      <Query
        query={USER_DETAILS_QUERY}
        variables={{ userid: this.props.userId }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
            query={USER_DETAILS_QUERY}
          >
            {this.state.editUserDetailBasics ?
              <UserDetailBasicsEditor />
              :
              <UserDetailBasics />
            }
            {/* TODO - Need to move these out of QueryHandler, queryData causes warnings! */}
            <button onClick={() => this.openUserDetailBasicsEditor()} >
              Open Editor
            </button>
            <button onClick={() => this.closeUserDetailBasicsEditor()} >
              Close Editor
            </button>
            <UserDetailEnrollment userQuery={USER_DETAILS_QUERY} />
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
