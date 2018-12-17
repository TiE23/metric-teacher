import React, { PureComponent } from "react";
import { Button, Container, Form, Header } from "semantic-ui-react";
import mergeWith from "lodash/mergeWith";

import utils from "../../../utils";

import UserSearchOptions from "./list/options/UserSearchOptions";
import UserListContainer from "./list/UserListContainer";

class UserListPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      where: {},
      searchVariables: null,
    };

    const buildSearchVariables = (whereClause) => {
      const where = buildWhere(whereClause);

      return mergeWith(
        {},
        { where },
        utils.mergeCustomizer,
      );
    };

    const buildWhere = (where) => {
      const ids = where.ids ?
        {
          id_in: where.ids.replace(/\s/, "").split(","),
        } : null;

      const email = where.email ?
        {
          email_contains: where.email,
        } : null;

      const fname = where.fname ?
        {
          fname_contains: where.fname,
        } : null;

      const lname = where.lname ?
        {
          lname_contains: where.lname,
        } : null;

      const types = where.types && where.types.length ?
        {
          type_in: where.types,
        } : null;

      const statuses = where.statuses && where.statuses.length ?
        {
          status_in: where.statuses,
        } : null;

      const flags = where.flags && where.flags.length ?
        {
          flags: utils.implodeBits(where.flags),
        } : null;

      return mergeWith(
        {},
        ids,
        email,
        fname,
        lname,
        types,
        statuses,
        flags,
      );
    };

    this.handleWhereChange = (where) => {
      this.setState({ where });
    };

    this.handleSearch = () => {
      this.setState(prevState => ({ searchVariables: buildSearchVariables(prevState.where) }));
    };
  }

  render() {
    return (
      <Container textAlign="center">
        <Header dividing>User Search</Header>
        <Form>
          <UserSearchOptions
            handleChange={this.handleWhereChange}
          />
          <Button
            onClick={this.handleSearch}
            color="olive"
            type="submit"
          >
            Search
          </Button>
        </Form>
        {utils.isEmptyRecursive(this.state.searchVariables) ?
          <p>
            <br />
            No Search Entered
          </p>
          :
          <UserListContainer
            searchVariables={this.state.searchVariables}
          />
        }
      </Container>
    );
  }
}

export default UserListPage;
