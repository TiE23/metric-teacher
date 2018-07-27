import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Grid, Dimmer } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import UserDetailBasics from "./UserDetailBasics";
import UserDetailBasicsEditor from "./UserDetailBasicsEditor";
import UserDetailEnrollment from "./UserDetailEnrollment";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE,
} from "../../../constants";

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
            {this.state.editUserDetailBasics &&
              <Grid.Row>
                <Grid.Column>
                  <Dimmer
                    active
                    page
                    onClickOutside={this.closeUserDetailBasicsEditor}
                  >
                    <UserDetailBasicsEditor
                      userData={queryProps.data.user}
                      queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
                      closeEditor={this.closeUserDetailBasicsEditor}
                    />
                  </Dimmer>
                </Grid.Column>
              </Grid.Row>
            }
            <Grid.Row centered>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
                <UserDetailBasics
                  userData={queryProps.data.user}
                  queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
                  openEditor={this.openUserDetailBasicsEditor}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_WIDE}>
                <UserDetailEnrollment
                  userData={queryProps.data.user}
                  queryInfo={{ query: USER_DETAILS_QUERY, variables: queryProps.variables }}
                />
              </Grid.Column>
            </Grid.Row>
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
