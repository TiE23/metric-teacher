import React, { PureComponent } from "react";
import { Button } from "semantic-ui-react";
import mergeWith from "lodash/mergeWith";

import utils from "../../../utils";

import QuestionSearchOptions from "./QuestionSearchOptions";
import QuestionListContainer from "./QuestionListContainer";

class QuestionSearchPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      where: {},
      searchVariables: null,
    };

    const buildSearchVariables = (whereClause) => {
      const where = buildWhere(whereClause);
      // TODO other search settings get built.

      return mergeWith(
        {},
        { where },
        utils.mergeCustomizer,
      );
    };

    const buildWhere = (where) => {
      const subjects = where.subjects && where.subjects.length ?
        {
          parent: {
            parent: {
              name_in: where.subjects,
            },
          },
        } : null;

      const direction = where.direction !== null && where.direction !== undefined ?
        {
          parent: {
            toMetric: where.direction,
          },
        } : null;

      const types = where.types && where.types.length ?
        {
          type_in: where.types,
        } : null;

      const statuses = where.statuses && where.statuses.length ?
        {
          status_in: where.statuses,
        } : null;

      const flag = where.flags && where.flags.length ?
        {
          flags: utils.implodeBits(where.flags),
        } : null;

      const difficulties = where.difficulties && where.difficulties.length ?
        {
          difficulty_in: where.difficulties,
        } : null;

      return mergeWith(
        {},
        subjects,
        direction,
        types,
        statuses,
        flag,
        difficulties,
        utils.mergeCustomizer,
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
      <div>
        <QuestionSearchOptions
          handleChange={this.handleWhereChange}
        />
        <Button
          onClick={this.handleSearch}
          color="olive"
        >
          Search
        </Button>
        {utils.isEmptyRecursive(this.state.searchVariables) ?
          <p>No Search Set</p>
          :
          <QuestionListContainer
            searchVariables={this.state.searchVariables}
          />
        }
      </div>
    );
  }
}

export default QuestionSearchPage;
