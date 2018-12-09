import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, Message, Popup, Table } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

import QuestionListTableCell from "../../misc/QuestionListTableCell";

import {
  FEEDBACK_TYPE_DROPDOWN,
  FEEDBACK_STATUS_DROPDOWN
} from "../../../../constants";

class FeedbackListTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.feedbackData,
      sortColumn: null,
      sortDirection: null,
      sorted: true,
    };

    // This is a list of iteratee addresses that determine the sort direction of a specific column.
    const addressBook = {
      id: "id",
      type: "type",
      status: "status",
      author: "author.id",
      reviewer: "reviewer.id",
      question: "question.question",
      updatedAt: "updatedAt",
    };

    // Performs the resorting of a complex data structure.
    const sorter = (data, address, sortDirection) => {
      const sortedData = sortBy(data, address);
      if (sortDirection === "descending") {
        return sortedData.reverse();
      }
      return sortedData;
    };

    // Using double arrows to make prop onClick definition cleaner looking.
    // The alternative is, ex: onClick={() => this.handleSort("subject")}
    // If this helps efficiency, I do not know...
    this.handleSort = clickedColumn => () => {
      const { data, sortColumn, sortDirection } = this.state;

      if (sortColumn !== clickedColumn) {
        const sortedData = sorter(data, addressBook[clickedColumn], sortDirection);
        this.setState({
          sortColumn: clickedColumn,
          sortDirection: "ascending",
          data: sortedData,
        });
      } else {
        this.setState({
          data: data.reverse(),
          sortDirection: sortDirection === "ascending" ? "descending" : "ascending",
        });
      }
    };

    // Because the content of the table can be changed in edits, we need to react and then correctly
    // resort the table when new feedbackData comes in.
    this.componentDidUpdate = (prevProps, prevState) => {
      // New data? Mark the table as not sorted!
      if (this.props.feedbackData !== prevProps.feedbackData) {
        this.setState({
          sorted: false,
        });
      }

      // The table isn't sorted? Sort it!
      if (!this.state.sorted) {
        const sortedData = sorter(
          this.props.feedbackData,
          addressBook[prevState.sortColumn],
          prevState.sortDirection,
        );

        this.setState({
          data: sortedData,
          sorted: true,
        });
      }
    };
  }

  render() {
    if (!this.props.feedbackData) return null;

    const { data, sortColumn, sortDirection } = this.state;

    // Column width total != 16. This is on purpose to widen the 1's.
    return (
      <Table sortable celled fixed singleLine compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "id" ? sortDirection : null}
              onClick={this.handleSort("id")}
            >
              Feedback ID
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "author" ? sortDirection : null}
              onClick={this.handleSort("author")}
            >
              Author ID
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "reviewer" ? sortDirection : null}
              onClick={this.handleSort("reviewer")}
            >
              Reviewer ID
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
              width={5}
              sorted={sortColumn === "question" ? sortDirection : null}
              onClick={this.handleSort("question")}
            >
              Question
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data.length ?
          <Table.Body>
            {data.map(feedback => (
              <Table.Row key={feedback.id}>
                <Table.Cell>
                  {feedback.id.slice(-4)}
                </Table.Cell>
                <Table.Cell>
                  {feedback.author.id.slice(-4)}
                </Table.Cell>
                <Table.Cell>
                  {feedback.reviewer ? `…${feedback.reviewer.id.slice(-5)}` : "None"}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span>
                        <Icon name={FEEDBACK_TYPE_DROPDOWN[feedback.type].icon} />
                        {feedback.type}
                      </span>
                    )}
                    content={FEEDBACK_TYPE_DROPDOWN[feedback.type].text}
                    position="left center"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span>
                        <Icon name={FEEDBACK_STATUS_DROPDOWN[feedback.status].icon} />
                        {feedback.status}
                      </span>
                    )}
                    content={FEEDBACK_STATUS_DROPDOWN[feedback.status].text}
                    position="left center"
                  />
                </Table.Cell>
                <Table.Cell>
                  <QuestionListTableCell
                    adminMode={this.props.adminMode}
                    question={{
                      id: feedback.question.id,
                      question: feedback.question.question,
                      answer: feedback.question.answer,
                    }}
                    author={feedback.author}
                    reviewer={feedback.reviewer}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
          :
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan={9}>
                <Message warning>
                  <Message.Header>No Results</Message.Header>
                  <p>Use a less restrictive search setting to see more feedback.</p>
                </Message>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        }
      </Table>
    );
  }
}

FeedbackListTable.propTypes = {
  feedbackData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
    author: PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.number.isRequired,
    }).isRequired,
    reviewer: PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.number.isRequired,
    }).isRequired,
  })),
  // queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  adminMode: PropTypes.bool,
};

FeedbackListTable.defaultProps = {
  feedbackData: null,
  // queryInfo: null,
  adminMode: false,
};

export default FeedbackListTable;
