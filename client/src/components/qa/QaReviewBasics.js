import React from "react";
import { Item, Responsive } from "semantic-ui-react";
import deline from "deline";

import utils from "../../utils";

import QaReviewChoices from "./QaReviewChoices";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_TYPE_NAMES,
} from "../../constants";

const QaReviewBasics = (props) => {
  const { question, answer } = props.qaData;
  const questionTypeName = utils.firstLetterCap(QUESTION_TYPE_NAMES[question.type]);

  let questionDescription;
  let surveyDetail;

  // Conversion questions need to be processed into an understandable English description.
  if (question.type === QUESTION_TYPE_CONVERSION) {
    questionDescription = deline`
      Convert ${utils.rangeWorder(question.data.conversion.range, question.data.fromUnitWord)}
      with a random step of
      ${utils.unitWorder(question.data.conversion.step, question.data.fromUnitWord)} to
      ${answer.data.toUnitWord.plural} within an accuracy of
      ${utils.unitWorder(answer.data.conversion.accuracy, answer.data.toUnitWord)}.
    `;
  } else if (question.type === QUESTION_TYPE_SURVEY) {
    questionDescription = question.text;
    surveyDetail = deline`
      Accepted survey answer range is
      ${utils.rangeWorder(question.data.survey.range, question.data.fromUnitWord)}.
    `;
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
          src={props.qaData.media || "/img/placeholder-square.png"}
        />
        <Item.Content>
          <Item.Header>{questionTypeName} Question</Item.Header>
          <Item.Description>{questionDescription}</Item.Description>
          {(question.detail || surveyDetail) &&
            <Item.Extra>{question.detail || surveyDetail}</Item.Extra>
          }
          {question.type === QUESTION_TYPE_WRITTEN &&
            <QaReviewChoices
              choices={answer.data.multiple.choices}
              choicesOffered={answer.data.multiple.choicesOffered}
            />
          }
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

QaReviewBasics.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default QaReviewBasics;
