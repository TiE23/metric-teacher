import React, { PureComponent } from "react";
import { Container, Grid, Button } from "semantic-ui-react";
import mergeWith from "lodash/mergeWith";

import utils from "../../../utils";

import UserSearchOptions from "./UserSearchOptions";
import UserListContainer from "./UserListContainer";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL,
} from "../../../constants";

class UserSearchPage extends PureComponent {
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
      const id = where.id ?
        {
          id_contains: where.id,
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
        id,
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
      <Grid padded>
        <Grid.Row centered>
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
            <Container textAlign="center">
              <UserSearchOptions
                handleChange={this.handleWhereChange}
              />
              <Button
                onClick={this.handleSearch}
                color="olive"
              >
                Search
              </Button>
              {utils.isEmptyRecursive(this.state.searchVariables) ?
                <p>
                  <br />
                  No Search Set
                </p>
                :
                <UserListContainer
                  searchVariables={this.state.searchVariables}
                />
              }
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default UserSearchPage;
