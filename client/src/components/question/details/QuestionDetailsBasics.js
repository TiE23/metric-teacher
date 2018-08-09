import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Icon, Modal, Image, Dropdown, Input } from "semantic-ui-react";

import utils from "../../../utils";

import FlagLister from "../../misc/FlagLister";

import {
  FLAGS_NONE,
  QUESTION_TYPE_NAMES,
  QUESTION_TYPE_ICONS,
  QUESTION_TYPE_DROPDOWN_OPTIONS,
  QUESTION_DIFFICULTY_NAMES,
  QUESTION_DIFFICULTY_ICONS,
  QUESTION_DIFFICULTY_DROPDOWN_OPTIONS,
  QUESTION_STATUS_NAMES,
  QUESTION_STATUS_DROPDOWN_OPTIONS,
  QUESTION_FLAG_NAMES,
  QUESTION_FLAG_DROPDOWN,
} from "../../../constants";

class QuestionDetailsBasics extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTypeChange = (e, { value }) => {
      if (this.props.handleChange) {
        this.props.handleChange({ qaFormData: { question: { basics: { type: value } } } });
      }
    };

    this.handleDifficultyChange = (e, { value }) => {
      if (this.props.handleChange) {
        this.props.handleChange({ qaFormData: { question: { basics: { difficulty: value } } } });
      }
    };

    this.handleStatusChange = (e, { value }) => {
      if (this.props.handleChange) {
        this.props.handleChange({ qaFormData: { question: { basics: { status: value } } } });
      }
    };

    this.handleFlagsChange = (e, { value }) => {
      if (this.props.handleChange) {
        let newFlags = 0;
        value.forEach((flag) => {
          newFlags |= flag;
        });
        this.props.handleChange({ qaFormData: { question: { basics: { flags: newFlags } } } });
      }
    };

    this.handleMediaChange = (e, { value }) => {
      if (this.props.handleChange) {
        this.props.handleChange({ qaFormData: { question: { basics: { media: value.trim() } } } });
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
            name={QUESTION_TYPE_ICONS[this.props.type] || "remove"}
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
            name={QUESTION_DIFFICULTY_ICONS[this.props.difficulty] || "remove"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleDifficultyChange}
                  options={QUESTION_DIFFICULTY_DROPDOWN_OPTIONS}
                  text="Difficulty"
                  value={this.props.difficulty}
                  inline
                />
                :
                "Difficulty"
              }
            </List.Header>
            <List.Description>
              {this.props.difficulty} {" "}
              - &quot;{QUESTION_DIFFICULTY_NAMES[this.props.difficulty]}&quot;
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="certificate" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleStatusChange}
                  options={QUESTION_STATUS_DROPDOWN_OPTIONS}
                  text="Status"
                  value={this.props.difficulty}
                  inline
                />
                :
                "Status"
              }
            </List.Header>
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
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleFlagsChange}
                  options={QUESTION_FLAG_DROPDOWN}
                  text="Flags"
                  value={utils.explodeBits(this.props.flags)}
                  inline
                  multiple
                  selection
                />
                :
                "Flags"
              }
            </List.Header>
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
        {(this.props.media || this.props.editMode) &&
        <List.Item>
          <List.Icon name="picture" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>Media</List.Header>
            <List.Description>
              <span>
                /img/question/
                {this.props.editMode ?
                  <Input
                    onChange={this.handleMediaChange}
                    value={this.props.media}
                    placeholder="..."
                    transparent
                  />
                  :
                  <b>{this.props.media || "..."}</b>
                }
              </span>
              <Modal
                trigger={<Icon name="search plus" />}
                header={this.props.media || "No Image"}
                content={
                  <Image
                    src={this.props.media ?
                      `/img/question/${this.props.media}` : "/img/placeholder-square.png"}
                    rounded
                    size="large"
                    centered
                  />
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
