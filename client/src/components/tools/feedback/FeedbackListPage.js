import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Button } from "semantic-ui-react";
import mergeWith from "lodash/mergeWith";

import utils from "../../../utils";

import FeedbackSearchOptions from "./list/options/FeedbackSearchOptions";
import FeedbackListContainer from "./list/FeedbackListContainer";

import {
  FEEDBACK_SEARCH,
} from "../../../graphql/Queries";

class FeedbackSearchPage extends PureComponent {
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
      const authors = where.authors && where.authors.length ?
        {
          author: {
            id_in: where.authors,
          },
        } : null;

      const reviewers = where.reviewers && where.reviewers.length ?
        {
          reviewer: {
            id_in: where.reviewers,
          },
        } : null;

      const statuses = where.statuses && where.statuses.length ?
        {
          status_in: where.statuses,
        } : null;

      const types = where.types && where.types.length ?
        {
          type_in: where.types,
        } : null;

      return mergeWith(
        {},
        authors,
        reviewers,
        statuses,
        types,
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
      <Container textAlign="center">
        {this.props.mode === "adminSearch" &&
        <FeedbackSearchOptions
          handleChange={this.handleWhereChange}
        />
        }
        <Button
          onClick={this.handleSearch}
          color="olive"
        >
          Search
        </Button>
        {utils.isEmptyRecursive(this.state.searchVariables) ?
          <p>
            <br />
            No Search Entered
          </p>
          :
          <FeedbackListContainer
            query={FEEDBACK_SEARCH}
            searchVariables={this.state.searchVariables}
            adminMode={this.props.mode === "adminSearch"}
          />
        }
      </Container>
    );
  }
}

FeedbackSearchPage.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default FeedbackSearchPage;
