import React from "react";
import PropTypes from "prop-types";
import { Item, Responsive } from "semantic-ui-react";
import deline from "deline";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_TYPE_NAMES,
  QUESTION_FLAG_USER_DETAIL_OPTIONAL,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../constants";

const QaReviewBasics = (props) => {
  const { question, answer } = props.qaData;
  const questionTypeName = QUESTION_TYPE_NAMES[question.type];

  let questionDescription;
  let surveyDetail;

  // Conversion questions need to be processed into an understandable English description.
  if (question.type === QUESTION_TYPE_CONVERSION) {
    questionDescription = deline`
      Convert ${utils.rangeWorder(question.data.conversion.range, question.data.fromUnitWord)}
      with a random step of
      ${utils.unitWorder(question.data.conversion.step, question.data.fromUnitWord)} to
      ${answer.data.toUnitWord.plural} within an accuracy of
      ${utils.unitWorder(answer.data.accuracy, answer.data.toUnitWord)}.
    `;
  } else if (question.type === QUESTION_TYPE_SURVEY) {
    questionDescription = question.text;

    let stepClause = "and must be a whole number (no decimals)";
    if (question.data.survey.step < 1) {
      stepClause = `and can be a whole number or a multiple of ${question.data.survey.step}`;
    } else if (question.data.survey.step > 1) {
      stepClause = `and must be a multiple of ${question.data.survey.step}`;
    }

    let noteClause = "";
    if (props.qaData.flags &
      (QUESTION_FLAG_USER_DETAIL_OPTIONAL + QUESTION_FLAG_USER_DETAIL_REQUIRED)) {
      noteClause = deline`For this survey question you are 
      ${props.qaData.flags & QUESTION_FLAG_USER_DETAIL_REQUIRED ? "required" : "welcome"}
      to enter a note to help add context to your answer.`;
    }

    surveyDetail = deline`Accepted survey answer range is
      ${utils.rangeWorder(question.data.survey.range, question.data.fromUnitWord)}
      ${stepClause}. ${noteClause}`;
  } else {
    questionDescription = question.text;
  }

  return (
    <Item.Group unstackable>
      <Item>
        <Responsive
          as={Item.Image}
          minWidth={500}
          size="small"
          src={`/img/question/${props.qaData.media}` || "/img/placeholder-square.png"}
          rounded
        />
        <Item.Content>
          <Item.Header>{questionTypeName} Question</Item.Header>
          <Item.Description>{questionDescription}</Item.Description>
          {(question.detail || surveyDetail) &&
            <Item.Extra>{question.detail || surveyDetail}</Item.Extra>
          }
          {props.children}
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

QaReviewBasics.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  children: PropTypes.node,
};

QaReviewBasics.defaultProps = {
  children: null,
};

export default QaReviewBasics;
