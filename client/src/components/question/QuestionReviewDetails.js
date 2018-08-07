import React from "react";
import PropTypes from "prop-types";
import { Grid, List } from "semantic-ui-react";

import utils from "../../utils";

import FlagLister from "../misc/FlagLister";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
  QUESTION_TYPE_NAMES,
  QUESTION_STATUS_NAMES,
  QUESTION_DIFFICULTY_NONE,
  QUESTION_DIFFICULTY_EASY,
  QUESTION_DIFFICULTY_EASY_MEDIUM,
  QUESTION_DIFFICULTY_MEDIUM,
  QUESTION_DIFFICULTY_MEDIUM_HARD,
  QUESTION_DIFFICULTY_HARD,
  QUESTION_DIFFICULTY_NAMES,
  QUESTION_FLAG_NAMES,
} from "../../constants";

const QuestionReviewDetails = (props) => {
  if (!props.qaData) return null;

  return (
    <Grid columns="equal" celled="internally">
      <Grid.Row>
        <Grid.Column>
          <List divided>
            <List.Item>
              <List.Icon name="question circle" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Question ID</List.Header>
                <List.Description>{props.qaData.questionId}</List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon
                name={
                  (props.qaData.question.type === QUESTION_TYPE_WRITTEN && "bullseye") ||
                  (props.qaData.question.type === QUESTION_TYPE_CONVERSION && "calculator") ||
                  (props.qaData.question.type === QUESTION_TYPE_SURVEY && "edit") || "remove"
                }
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header>Type</List.Header>
                <List.Description>
                  {props.qaData.question.type} {" "}
                  - &quot;
                  {utils.firstLetterCap(QUESTION_TYPE_NAMES[props.qaData.question.type])}
                  &quot;
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon
                name={
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_NONE && "thermometer empty") ||
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_EASY && "thermometer empty") ||
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_EASY_MEDIUM && "thermometer quarter") ||
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_MEDIUM && "thermometer half") ||
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_MEDIUM_HARD && "thermometer three quarters") ||
                  (props.qaData.difficulty === QUESTION_DIFFICULTY_HARD && "thermometer full") ||
                  "remove"
                }
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header>Difficulty</List.Header>
                <List.Description>
                  {props.qaData.difficulty} {" "}
                  - &quot;
                  {utils.firstLetterCap(QUESTION_DIFFICULTY_NAMES[props.qaData.difficulty])}
                  &quot;
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="certificate" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Status</List.Header>
                <List.Description>
                  {props.qaData.status}{" "}
                  - &quot;{utils.firstLetterCap(QUESTION_STATUS_NAMES[props.qaData.status])}&quot;
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="flag" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Flags</List.Header>
                <List.Description>
                  {props.qaData.flags} {" - "}
                  <FlagLister
                    flags={props.qaData.flags}
                    flagsDictionary={QUESTION_FLAG_NAMES}
                  />
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column>
          <p>2</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <p>3</p>
        </Grid.Column>
        <Grid.Column>
          <p>4</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

QuestionReviewDetails.propTypes = {
  qaData: PropTypes.shape({
    questionId: PropTypes.string.isRequired,
    subSubjectId: PropTypes.string.isRequired,
    flags: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    media: PropTypes.string,
    question: PropTypes.shape({
      text: PropTypes.string,
      detail: PropTypes.string,
      type: PropTypes.number.isRequired,
      data: PropTypes.shape({
        conversion: PropTypes.shape({
          step: PropTypes.number.isRequired,
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              value: PropTypes.number.isRequired,
            }).isRequired,
            top: PropTypes.shape({
              value: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
        survey: PropTypes.shape({
          step: PropTypes.number.isRequired,
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              value: PropTypes.number.isRequired,
            }).isRequired,
            top: PropTypes.shape({
              value: PropTypes.number.isRequired,
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      }),
    }).isRequired,
    answer: PropTypes.shape({
      detail: PropTypes.string,
      data: PropTypes.shape({
        multiple: PropTypes.shape({
          choices: PropTypes.arrayOf(PropTypes.shape({
            unit: PropTypes.string.isRequired,
            written: PropTypes.string,
            value: PropTypes.number,
          })).isRequired,
          choicesOffered: PropTypes.number.isRequired,
        }),
        conversion: PropTypes.shape({
          accuracy: PropTypes.number.isRequired,
          range: PropTypes.shape({
            bottom: PropTypes.shape({
              unit: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
        }),
      }).isRequired,
    }).isRequired,
  }),
};

QuestionReviewDetails.defaultProps = {
  qaData: null,
};

export default QuestionReviewDetails;
