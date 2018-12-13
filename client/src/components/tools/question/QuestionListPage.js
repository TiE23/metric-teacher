import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Container, Form, Header } from "semantic-ui-react";
import mergeWith from "lodash/mergeWith";

import utils from "../../../utils";

import QuestionSearchOptions from "./list/options/QuestionSearchOptions";
import QuestionContributionOptions from "./list/options/QuestionContributionOptions";
import QuestionListContainer from "./list/QuestionListContainer";

import {
  QUESTION_SEARCH,
} from "../../../graphql/Queries";

class QuestionListPage extends PureComponent {
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

      const questionText = where.questionText ?
        {
          question_contains: where.questionText,
        } : null;

      const answerText = where.answerText ?
        {
          answer_contains: where.answerText,
        } : null;

      const subjects = where.subjects && where.subjects.length ?  // Check length of array.
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

      const flags = where.flags && where.flags.length ?
        {
          flags: utils.implodeBits(where.flags),
        } : null;

      const difficulties = where.difficulties && where.difficulties.length ?
        {
          difficulty_in: where.difficulties,
        } : null;

      return mergeWith(
        {},
        ids,
        authors,
        reviewers,
        questionText,
        answerText,
        subjects,
        direction,
        types,
        statuses,
        flags,
        difficulties,
        authors,
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
        <Header dividing>Question Search</Header>
        <Form>
          {this.props.mode === "adminSearch" &&
            <QuestionSearchOptions
              handleChange={this.handleWhereChange}
            />
          }
          {this.props.mode === "userContributions" &&
            <QuestionContributionOptions
              handleChange={this.handleWhereChange}
            />
          }
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
          <QuestionListContainer
            query={QUESTION_SEARCH}
            searchVariables={this.state.searchVariables}
            adminMode={this.props.mode === "adminSearch"}
          />
        }
      </Container>
    );
  }
}

QuestionListPage.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default QuestionListPage;
