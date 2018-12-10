import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, Message, Popup, Table } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

import UserDetailsModal from "../../../user/UserDetailsModal";

import {
  USER_STATUS_DROPDOWN,
  USER_TYPE_DROPDOWN,
} from "../../../../constants";

class UserListTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.userData,
      sortColumn: null,
      sortDirection: null,
      sorted: true,
    };

    this.handleSort = clickedColumn => () => {
      const { data, sortColumn, sortDirection } = this.state;

      if (sortColumn !== clickedColumn) {
        this.setState({
          sortColumn: clickedColumn,
          sortDirection: "ascending",
          data: sortBy(data, clickedColumn),
        });

        return;
      }

      this.setState({
        data: data.reverse(),
        sortDirection: sortDirection === "ascending" ? "descending" : "ascending",
      });
    };

    // Because the content of the table can be changed in edits, we need to react and then correctly
    // resort the table when new userData comes in.
    this.componentDidUpdate = (prevProps, prevState) => {
      // New data? Mark the table as not sorted!
      if (this.props.userData !== prevProps.userData) {
        this.setState({
          sorted: false,
        });
      }

      // The table isn't sorted? Sort it!
      if (!this.state.sorted) {
        this.setState({
          data: sortBy(prevState.data, prevState.sortColumn),
          sorted: true,
        });
      }
    };
  }

  render() {
    if (!this.props.userData) return null;

    const { data, sortColumn, sortDirection } = this.state;

    // Column width total != 16. This is on purpose.
    return (
      <Table sortable celled fixed singleLine compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "id" ? sortDirection : null}
              onClick={this.handleSort("id")}
            >
              User ID
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
              sorted={sortColumn === "email" ? sortDirection : null}
              onClick={this.handleSort("email")}
            >
              Email
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "fname" ? sortDirection : null}
              onClick={this.handleSort("fname")}
            >
              First
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "lname" ? sortDirection : null}
              onClick={this.handleSort("lname")}
            >
              Last
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "type" ? sortDirection : null}
              onClick={this.handleSort("type")}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "status" ? sortDirection : null}
              onClick={this.handleSort("status")}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "flags" ? sortDirection : null}
              onClick={this.handleSort("flags")}
            >
              Flags
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
            >
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data.length ?
          <Table.Body>
            {data.map(user => (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span style={{ cursor: "help" }}>{`${user.id.slice(-8)}`}</span>
                    )}
                    content={(
                      <React.Fragment>
                        <b>User ID</b>: {user.id}
                        <ul>
                          <li>
                            <b>CreatedAt</b>: {user.createdAt}
                          </li>
                          <li>
                            <b>UpdatedAt</b>: {user.updatedAt}
                          </li>
                        </ul>
                      </React.Fragment>
                    )}
                    position="bottom left"
                    on="click"
                    wide="very"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(<span style={{ cursor: "help" }}>{user.email}</span>)}
                    content={(<React.Fragment>{user.email}</React.Fragment>)}
                    position="bottom left"
                    on="click"
                    wide="very"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(<span style={{ cursor: "help" }}>{user.fname}</span>)}
                    content={user.fname}
                    positon="left center"
                    on="click"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(<span style={{ cursor: "help" }}>{user.lname}</span>)}
                    content={user.lname}
                    positon="left center"
                    on="click"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span style={{ cursor: "default" }}>
                        <Icon name={USER_TYPE_DROPDOWN[user.type].icon} />
                        {" "}
                        {USER_TYPE_DROPDOWN[user.type].text}
                      </span>
                    )}
                    content={`Type ${user.type}`}
                    positon="left center"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span style={{ cursor: "default" }}>
                        <Icon name={USER_STATUS_DROPDOWN[user.status].icon} />
                        {" "}
                        {USER_STATUS_DROPDOWN[user.status].text}
                      </span>
                    )}
                    content={`Status ${user.status}`}
                    positon="left center"
                  />
                </Table.Cell>
                <Table.Cell>
                  {user.flags}
                </Table.Cell>
                <Table.Cell>
                  <UserDetailsModal userId={user.id}>
                    <Icon name="zoom" style={{ cursor: "pointer" }} />
                  </UserDetailsModal>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          :
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={6}>
                <Message warning>
                  <Message.Header>No Results</Message.Header>
                  <p>Use a less restrictive search setting to see more users.</p>
                </Message>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        }
      </Table>
    );
  }
}

UserListTable.propTypes = {
  userData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    honorific: PropTypes.string,
    fname: PropTypes.string.isRequired,
    lname: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
  })),
  // TODO might use this for a user editing modal?
  // queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

UserListTable.defaultProps = {
  userData: null,
  // queryInfo: null,
};

export default UserListTable;
