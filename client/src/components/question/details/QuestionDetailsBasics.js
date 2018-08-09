import React, { PureComponent} from "react";
import PropTypes from "prop-types";
import { List, Icon, Modal, Image, Dropdown } from "semantic-ui-react";

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
  QUESTION_TYPE_DROPDOWN_OPTIONS,
} from "../../../constants";

class QuestionDetailsBasics extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTypeChange = (e, { value }) => {
      if (this.props.handleChange) {
        this.props.handleChange({ qaFormData: { question: { basics: { type: value } } } });
      }
    };
  }

  render() {
    return (
      <List divided>
        <List.Item>
          <List.Icon name="question circle" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Question ID</List.Header>
            <List.Description>{this.props.id}</List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon
            name={
              (this.props.type === QUESTION_TYPE_WRITTEN && "bullseye") ||
              (this.props.type === QUESTION_TYPE_CONVERSION && "calculator") ||
              (this.props.type === QUESTION_TYPE_SURVEY && "edit") ||
              "remove"
            }
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleTypeChange}
                  options={QUESTION_TYPE_DROPDOWN_OPTIONS}
                  text="Type"
                  value={this.props.type}
                  inline
                />
                :
                "Type"
              }
            </List.Header>
            <List.Description>
              {this.props.type} {" "}
              - &quot;
              {QUESTION_TYPE_NAMES[this.props.type]}
              &quot;
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon
            name={
              (this.props.difficulty === QUESTION_DIFFICULTY_NONE && "thermometer empty") ||
              (this.props.difficulty === QUESTION_DIFFICULTY_EASY && "thermometer empty") ||
              (this.props.difficulty === QUESTION_DIFFICULTY_EASY_MEDIUM && "thermometer quarter") ||
              (this.props.difficulty === QUESTION_DIFFICULTY_MEDIUM && "thermometer half") ||
              (this.props.difficulty === QUESTION_DIFFICULTY_MEDIUM_HARD && "thermometer three quarters") ||
              (this.props.difficulty === QUESTION_DIFFICULTY_HARD && "thermometer full") ||
              "remove"
            }
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>Difficulty</List.Header>
            <List.Description>
              {this.props.difficulty} {" "}
              - &quot;{QUESTION_DIFFICULTY_NAMES[this.props.difficulty]}&quot;
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="certificate" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Status</List.Header>
            <List.Description>
              {this.props.status}{" "}
              - &quot;{QUESTION_STATUS_NAMES[this.props.status]}&quot;
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon
            name={this.props.flags === FLAGS_NONE ? "flag outline" : "flag"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>Flags</List.Header>
            <List.Description>
              {this.props.flags} {" - "}
              &quot;
              <FlagLister
                flags={this.props.flags}
                flagsDictionary={QUESTION_FLAG_NAMES}
              />
              &quot;
            </List.Description>
          </List.Content>
        </List.Item>
        {this.props.media &&
        <List.Item>
          <List.Icon name="picture" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Media</List.Header>
            <List.Description>
              <Modal
                trigger={
                  <span>
                    /img/question/<b>{this.props.media}</b> <Icon name="search plus" />
                  </span>
                }
                header={this.props.media}
                content={
                  <Image src={`/img/question/${this.props.media}`} rounded size="large" centered/>
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
  }
}

QuestionDetailsBasics.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  status: PropTypes.number.isRequired,
  flags: PropTypes.number.isRequired,
  media: PropTypes.string,
  editMode: PropTypes.bool,
  handleChange: PropTypes.func,
};

QuestionDetailsBasics.defaultProps = {
  media: null,
  editMode: false,
  handleChange: null,
};

export default QuestionDetailsBasics;
