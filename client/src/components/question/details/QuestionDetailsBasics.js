import React from "react";
import PropTypes from "prop-types";
import { List, Icon, Modal, Image } from "semantic-ui-react";

import FlagLister from "../../misc/FlagLister";

import {
  FLAGS_NONE,
  QUESTION_DIFFICULTY_NONE,
  QUESTION_DIFFICULTY_EASY,
  QUESTION_DIFFICULTY_EASY_MEDIUM,
  QUESTION_DIFFICULTY_MEDIUM,
  QUESTION_DIFFICULTY_MEDIUM_HARD,
  QUESTION_DIFFICULTY_HARD,
  QUESTION_DIFFICULTY_NAMES,
  QUESTION_FLAG_NAMES,
  QUESTION_STATUS_NAMES,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_NAMES,
  QUESTION_TYPE_SURVEY,
  QUESTION_TYPE_WRITTEN,
} from "../../../constants";

const QuestionDetailsBasics = props => (
  <List divided>
    <List.Item>
      <List.Icon name="question circle" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Question ID</List.Header>
        <List.Description>{props.id}</List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={
          (props.type === QUESTION_TYPE_WRITTEN && "bullseye") ||
          (props.type === QUESTION_TYPE_CONVERSION && "calculator") ||
          (props.type === QUESTION_TYPE_SURVEY && "edit") ||
          "remove"
        }
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>Type</List.Header>
        <List.Description>
          {props.type} {" "}
          - &quot;
          {QUESTION_TYPE_NAMES[props.type]}
          &quot;
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={
          (props.difficulty === QUESTION_DIFFICULTY_NONE && "thermometer empty") ||
          (props.difficulty === QUESTION_DIFFICULTY_EASY && "thermometer empty") ||
          (props.difficulty === QUESTION_DIFFICULTY_EASY_MEDIUM && "thermometer quarter") ||
          (props.difficulty === QUESTION_DIFFICULTY_MEDIUM && "thermometer half") ||
          (props.difficulty === QUESTION_DIFFICULTY_MEDIUM_HARD && "thermometer three quarters") ||
          (props.difficulty === QUESTION_DIFFICULTY_HARD && "thermometer full") ||
          "remove"
        }
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>Difficulty</List.Header>
        <List.Description>
          {props.difficulty} {" "}
          - &quot;{QUESTION_DIFFICULTY_NAMES[props.difficulty]}&quot;
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon name="certificate" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Status</List.Header>
        <List.Description>
          {props.status}{" "}
          - &quot;{QUESTION_STATUS_NAMES[props.status]}&quot;
        </List.Description>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Icon
        name={props.flags === FLAGS_NONE ? "flag outline" : "flag"}
        size="large"
        verticalAlign="top"
      />
      <List.Content>
        <List.Header>Flags</List.Header>
        <List.Description>
          {props.flags} {" - "}
          &quot;
          <FlagLister
            flags={props.flags}
            flagsDictionary={QUESTION_FLAG_NAMES}
          />
          &quot;
        </List.Description>
      </List.Content>
    </List.Item>
    {props.media &&
    <List.Item>
      <List.Icon name="picture" size="large" verticalAlign="top" />
      <List.Content>
        <List.Header>Media</List.Header>
        <List.Description>
          <Modal
            trigger={
              <span>
                /img/question/<b>{props.media}</b> <Icon name="search plus" />
              </span>
            }
            header={props.media}
            content={
              <Image src={`/img/question/${props.media}`} rounded size="large" centered />
            }
            actions={["Close"]}
            basic
          />
        </List.Description>
      </List.Content>
    </List.Item>
    }
  </List>
);

QuestionDetailsBasics.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  flags: PropTypes.number.isRequired,
  media: PropTypes.string,
};

QuestionDetailsBasics.defaultProps = {
  media: null,
};

export default QuestionDetailsBasics;
