import React from "react";
import PropTypes from "prop-types";
import { Icon, Image, Item, Modal, Responsive } from "semantic-ui-react";

import utils from "../../utils";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  CHALLENGE_MEDIA_MIN_WIDTH,
  QUESTION_TYPE_NAMES,
} from "../../constants";

const QaReviewBasics = (props) => {
  const { questionDescription, surveyDetail } =
    utils.qaReviewTextFormatter(props.qaData, props.challengeMode);
  const { question } = props.qaData;
  const questionTypeName = QUESTION_TYPE_NAMES[question.type];

  return (
    <Item.Group unstackable>
      <Item>
        {props.qaData.media &&
          <Responsive
            as={Item.Image}
            minWidth={CHALLENGE_MEDIA_MIN_WIDTH}
            size="small"
            src={`/img/question/${props.qaData.media}`}
            rounded
          />
        }
        <Item.Content>
          <Item.Header>{questionTypeName} Question</Item.Header>
          <Item.Description>{questionDescription}</Item.Description>
          {(question.detail || surveyDetail) &&
            <Item.Extra>{question.detail || surveyDetail}</Item.Extra>
          }
          {props.children}
          {props.qaData.media &&
            <Responsive
              as={Modal}
              maxWidth={CHALLENGE_MEDIA_MIN_WIDTH - 1}
              trigger={
                <span>
                  <br />
                  <Icon name="image outline" size="large" color="grey" />
                  {" "}
                  <b>View Media</b>
                </span>
              }
              content={
                <Image
                  src={`/img/question/${props.qaData.media}`}
                  rounded
                  size="large"
                  centered
                />
              }
              actions={["Close"]}
              basic
            />
          }
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

QaReviewBasics.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  children: PropTypes.node,
  challengeMode: PropTypes.bool,
};

QaReviewBasics.defaultProps = {
  children: null,
  challengeMode: false,
};

export default QaReviewBasics;
