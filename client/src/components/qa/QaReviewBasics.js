import React from "react";
import PropTypes from "prop-types";
import { Item, Responsive } from "semantic-ui-react";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  QUESTION_TYPE_NAMES,
} from "../../constants";

const QaReviewBasics = (props) => {
  const { question } = props.qaData;
  const questionTypeName = QUESTION_TYPE_NAMES[question.type];

  const { questionDescription, surveyDetail } = utils.qaReviewTextFormatter(props.qaData);

  return (
    <Item.Group unstackable>
      <Item>
        <Responsive
          as={Item.Image}
          minWidth={500}
          size="small"
          src={
            (props.qaData.media && `/img/question/${props.qaData.media}`) ||
              "/img/placeholder-square.png"
          }
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
