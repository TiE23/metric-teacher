import React from "react";
import PropTypes from "prop-types";
import { Popup } from "semantic-ui-react";

import XLink from "../../misc/ExternalLink";

import {
  USER_TYPE_NAMES,
} from "../../../constants";

const QuestionListTableCell = props => (
  <Popup
    trigger={(<span style={{ cursor: "help" }}>{props.question.question}</span>)}
    content={(
      <span>
        <b>Question ID</b>: {props.question.id}
        <ul>
          <li>
            <b>Question</b>: &quot;{props.question.question}&quot;
          </li>
          <li>
            <b>Answer</b>: &quot;{props.question.answer}&quot;
          </li>
          <li>
            <b>Author</b>:{" "}
            {props.author ?
              <React.Fragment>
                {props.author.id} (<i>{USER_TYPE_NAMES[props.author.type]}</i>)
                {" "}
                {props.adminMode && <XLink to={`/user/${props.author.id}`}>View</XLink>}
              </React.Fragment>
              :
              "None"
            }
          </li>
          <li>
            <b>Reviewer</b>:{" "}
            {props.reviewer ?
              <React.Fragment>
                {props.reviewer.id} (<i>{USER_TYPE_NAMES[props.reviewer.type]}</i>)
                {" "}
                {props.adminMode && <XLink to={`/user/${props.reviewer.id}`}>View</XLink>}
              </React.Fragment>
              :
              "None"
            }
          </li>
        </ul>
      </span>
    )}
    position="bottom left"
    on="click"
    wide="very"
  />
);

QuestionListTableCell.propTypes = {
  adminMode: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
  reviewer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

QuestionListTableCell.defaultProps = {
  author: null,
  reviewer: null,
};

export default QuestionListTableCell;
