import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Container, Header } from "semantic-ui-react";
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
      const ids = where.ids ?
        {
          id_in: where.ids.replace(/\s/, "").split(","),
        } : null;

      const questions = where.questions ?
        {
          question: {
            id_in: where.questions.replace(/\s/, "").split(","),
          },
        } : null;

      const authors = where.authors ?
        {
          author: {
            id_in: where.authors.replace(/\s/, "").split(","),
          },
        } : null;

      const reviewers = where.reviewers ?
        {
          reviewer: {
            id_in: where.reviewers.replace(/\s/, "").split(","),
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
        ids,
        questions,
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
        <Header dividing>Feedback Search</Header>
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
