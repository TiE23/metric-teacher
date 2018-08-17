import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

import utils from "../../../utils";

class QuestionListTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.questionData,
      sortColumn: null,
      sortDirection: null,
    };

    // Using double arrows to make prop onClick definition cleaner looking.
    // The alternative is, ex: onClick={() => this.handleSort("subject", "parent.parent.name")}
    // If this helps efficiency, I do not know...
    this.handleSort = (clickedColumn, address) => () => {
      const { data, sortColumn, sortDirection } = this.state;

      if (sortColumn !== clickedColumn) {
        const sortedData = sortBy(data, o => utils.navigateObjectDots(o, address));
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
  }

  render() {
    if (!this.props.questionData) return null;

    const { data, sortColumn, sortDirection } = this.state;
    return (
      <Table sortable celled fixed singleLine compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "subject" ? sortDirection : null}
              onClick={this.handleSort("subject", "parent.parent.name")}
            >
              Subject
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "scale" ? sortDirection : null}
              onClick={this.handleSort("scale", "parent.scale")}
            >
              Scale
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "direction" ? sortDirection : null}
              onClick={this.handleSort("direction", "parent.direction")}
            >
              Direction
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "type" ? sortDirection : null}
              onClick={this.handleSort("type", "type")}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "status" ? sortDirection : null}
              onClick={this.handleSort("status", "status")}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "flags" ? sortDirection : null}
              onClick={this.handleSort("flags", "flags")}
            >
              Flags
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "difficulty" ? sortDirection : null}
              onClick={this.handleSort("difficulty", "difficulty")}
            >
              Difficulty
            </Table.HeaderCell>
            <Table.HeaderCell
              width={7}
              sorted={sortColumn === "question" ? sortDirection : null}
              onClick={this.handleSort("question", "question")}
            >
              Question
            </Table.HeaderCell>
            <Table.HeaderCell
              width={2}
            >
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(question => (
            <Table.Row key={question.id}>
              <Table.Cell>{question.parent.parent.name}</Table.Cell>
              <Table.Cell>{utils.firstLetterCap(question.parent.scale)}</Table.Cell>
              <Table.Cell>{question.parent.toMetric ? "To Metric" : "From Metric"}</Table.Cell>
              <Table.Cell>{question.type}</Table.Cell>
              <Table.Cell>{question.status}</Table.Cell>
              <Table.Cell>{question.flags}</Table.Cell>
              <Table.Cell>{question.difficulty}</Table.Cell>
              <Table.Cell>{question.question}</Table.Cell>
              <Table.Cell>Buttons Here</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

QuestionListTable.propTypes = {
  questionData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    parent: PropTypes.shape({   // SubSubject
      id: PropTypes.string.isRequired,
      scale: PropTypes.string.isRequired,
      toMetric: PropTypes.bool.isRequired,
      parent: PropTypes.shape({ // Subject
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })),
};

QuestionListTable.defaultProps = {
  questionData: null,
};

export default QuestionListTable;
