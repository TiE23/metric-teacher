import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Message } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

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
              Author
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {data.length ?
          <Table.Body>
            {data.map(feedback => (
              <Table.Row key={feedback.id}>
                <Table.Cell>
                  {feedback.id}
                </Table.Cell>
                <Table.Cell>
                  {feedback.author.id}
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
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
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
  // adminMode: PropTypes.bool,
};

FeedbackListTable.defaultProps = {
  feedbackData: null,
  // queryInfo: null,
  // adminMode: false,
};

export default FeedbackListTable;
