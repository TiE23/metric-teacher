import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

import utils from "../../../utils";

class QuestionListTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.questionData,
      sortColumn: null,
      sortDirection: null,
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
            >
              Subject
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "scale" ? sortDirection : null}
            >
              Scale
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "direction" ? sortDirection : null}
            >
              Direction
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "type" ? sortDirection : null}
            >
              Type
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "status" ? sortDirection : null}
            >
              Status
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "flags" ? sortDirection : null}
            >
              Flags
            </Table.HeaderCell>
            <Table.HeaderCell
              width={1}
              sorted={sortColumn === "difficulty" ? sortDirection : null}
            >
              Difficulty
            </Table.HeaderCell>
            <Table.HeaderCell
              width={7}
              sorted={sortColumn === "question" ? sortDirection : null}
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
