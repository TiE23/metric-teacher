import React from "react";
import PropTypes from "prop-types";
import deline from "deline";

import utils from "../../utils";

import {
  QUESTION_TYPE_CONVERSION,
} from "../../constants";

const QaReviewBasics = (props) => {
  const { question, answer } = props.qaData;
  const questionText = question.type === QUESTION_TYPE_CONVERSION ? deline`
    Convert ${utils.rangeWorder(question.data.conversion.range, question.data.fromUnitWord)}
    with a random step of
    ${utils.unitWorder(question.data.conversion.step, question.data.fromUnitWord)} to
    ${answer.data.toUnitWord.plural} within an accuracy of
    ${utils.unitWorder(answer.data.conversion.accuracy, answer.data.toUnitWord)}.
  ` :
    question.text;

  return (<p>QaReviewBasics, {questionText}</p>);
};

QaReviewBasics.propTypes = {
  qaData: PropTypes.object.isRequired,
};

export default QaReviewBasics;
