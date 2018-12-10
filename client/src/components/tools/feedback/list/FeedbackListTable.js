import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, Message, Popup, Table } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

import FeedbackEditorModal from "../FeedbackEditorModal";
import QuestionListTableCell from "../../misc/QuestionListTableCell";
import QuestionQaDetailsAndEditorModal from "../../question/list/QuestionQaDetailsAndEditorModal";
import XLink from "../../../misc/ExternalLink";

import {
  USER_TYPE_NAMES,
  FEEDBACK_TYPE_DROPDOWN,
  FEEDBACK_STATUS_DROPDOWN,
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
      author: "author.id",
      reviewer: "reviewer.id",
      type: "type",
      text: "text",
      status: "status",
      question: "question.question",
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
              width={2}
              sorted={sortColumn === "text" ? sortDirection : null}
              onClick={this.handleSort("text")}
            >
              Text
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
            {this.props.adminMode &&
              <Table.HeaderCell
                width={1}
              >
                Actions
              </Table.HeaderCell>
            }
          </Table.Row>
        </Table.Header>
        {data.length ?
          <Table.Body>
            {data.map(feedback => (
              <Table.Row key={feedback.id}>
                <Table.Cell>
                  <Popup
                    trigger={(<span style={{ cursor: "help" }}>{feedback.id.slice(-4)}</span>)}
                    content={(
                      <React.Fragment>
                        <b>Feedback ID</b>: {feedback.id}
                        <ul>
                          <li>
                            <b>CreatedAt</b>: {feedback.createdAt}
                          </li>
                          <li>
                            <b>UpdatedAt</b>: {feedback.updatedAt}
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
                    trigger={(
                      <span style={{ cursor: "help" }}>{feedback.author.id.slice(-4)}</span>
                    )}
                    content={(
                      <React.Fragment>
                        <b>Author ID</b>:{" "}
                        {feedback.author.id} (<i>{USER_TYPE_NAMES[feedback.author.type]}</i>)
                        {" "}
                        {this.props.adminMode &&
                          <XLink to={`/user/${feedback.author.id}`}>View</XLink>
                        }
                      </React.Fragment>
                    )}
                    position="bottom left"
                    on="click"
                    wide="very"
                  />
                </Table.Cell>
                <Table.Cell>
                  {feedback.reviewer ?
                    <Popup
                      trigger={(
                        <span style={{ cursor: "help" }}>{feedback.reviewer.id.slice(-4)}</span>
                      )}
                      content={(
                        <React.Fragment>
                          <b>Reviewer ID</b>:{" "}
                          {feedback.reviewer.id} (<i>{USER_TYPE_NAMES[feedback.reviewer.type]}</i>)
                          {" "}
                          {this.props.adminMode &&
                          <XLink to={`/user/${feedback.reviewer.id}`}>View</XLink>
                          }
                        </React.Fragment>
                      )}
                      position="bottom left"
                      on="click"
                      wide="very"
                    /> : <i>None</i>}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span style={{ cursor: "default" }}>
                        <Icon name={FEEDBACK_TYPE_DROPDOWN[feedback.type].icon} />
                        {feedback.type}
                      </span>
                    )}
                    content={FEEDBACK_TYPE_DROPDOWN[feedback.type].text}
                    position="left center"
                  />
                </Table.Cell>
                <Table.Cell>
                  {feedback.text ?
                    <Popup
                      trigger={(
                        <span style={{ cursor: "help" }}>{feedback.text}</span>
                      )}
                      content={(<p>{feedback.text}</p>)}
                      position="bottom center"
                      wide="very"
                    /> : <i>None</i>}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    trigger={(
                      <span style={{ cursor: "default" }}>
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
                {this.props.adminMode &&
                  <Table.Cell>
                    <FeedbackEditorModal
                      queryInfo={this.props.queryInfo}
                      feedbackId={feedback.id}
                      feedbackType={feedback.type}
                      feedbackStatus={feedback.status}
                      feedbackText={feedback.text}
                    >
                      <Icon name="paper plane" style={{ cursor: "pointer" }} />
                    </FeedbackEditorModal>
                    <QuestionQaDetailsAndEditorModal
                      questionId={feedback.question.id}
                      editorMode
                      queryInfo={this.props.queryInfo}
                      modalProps={{ size: "fullscreen" }}
                    >
                      <Icon name="pencil" style={{ cursor: "pointer" }} />
                    </QuestionQaDetailsAndEditorModal>
                  </Table.Cell>
                }
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
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
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
    }),
  })),
  queryInfo: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  adminMode: PropTypes.bool,
};

FeedbackListTable.defaultProps = {
  feedbackData: null,
  // queryInfo: null,
  adminMode: false,
};

export default FeedbackListTable;
