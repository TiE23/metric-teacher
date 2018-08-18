import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Icon, Modal, Image, Dropdown, Input } from "semantic-ui-react";

import utils from "../../../utils";

import EditBelowIcon from "../../misc/EditBelowIcon";

import {
  FLAGS_NONE,
  QUESTION_TYPE_NAMES,
  QUESTION_TYPE_DROPDOWN,
  QUESTION_DIFFICULTY_DROPDOWN,
  QUESTION_STATUS_DROPDOWN,
  QUESTION_FLAG_NAMES,
  QUESTION_FLAG_DROPDOWN,
} from "../../../constants";

class QuestionDetailsBasics extends PureComponent {
  constructor(props) {
    super(props);

    this.handleTypeChange = (e, { value }) => {
      if (this.props.handleBasicsChange) {
        this.props.handleBasicsChange({ type: value });
      }
    };

    this.handleDifficultyChange = (e, { value }) => {
      if (this.props.handleBasicsChange) {
        this.props.handleBasicsChange({ difficulty: value });
      }
    };

    this.handleStatusChange = (e, { value }) => {
      if (this.props.handleBasicsChange) {
        this.props.handleBasicsChange({ status: value });
      }
    };

    this.handleFlagsChange = (e, { value }) => {
      if (this.props.handleBasicsChange) {
        let newFlags = 0;
        value.forEach((flag) => {
          newFlags |= flag;
        });
        this.props.handleBasicsChange({ flags: newFlags });
      }
    };

    this.handleMediaChange = (e, { value }) => {
      if (this.props.handleBasicsChange) {
        this.props.handleBasicsChange({ media: value.trim() });
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
            name={(QUESTION_TYPE_DROPDOWN[this.props.type] &&
              QUESTION_TYPE_DROPDOWN[this.props.type].icon) || "remove"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleTypeChange}
                  options={QUESTION_TYPE_DROPDOWN}
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
            name={(QUESTION_DIFFICULTY_DROPDOWN[this.props.difficulty] &&
              QUESTION_DIFFICULTY_DROPDOWN[this.props.difficulty].icon) || "remove"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleDifficultyChange}
                  options={QUESTION_DIFFICULTY_DROPDOWN}
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
              - &quot;{(QUESTION_DIFFICULTY_DROPDOWN[this.props.difficulty] &&
              QUESTION_DIFFICULTY_DROPDOWN[this.props.difficulty].text) || "Unknown"}&quot;
            </List.Description>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon
            name={(QUESTION_STATUS_DROPDOWN[this.props.status] &&
            QUESTION_STATUS_DROPDOWN[this.props.status].icon) || "remove"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleStatusChange}
                  options={QUESTION_STATUS_DROPDOWN}
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
              - &quot;{(QUESTION_STATUS_DROPDOWN[this.props.status] &&
              QUESTION_STATUS_DROPDOWN[this.props.status].text) || "Unknown"}&quot;
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
              {this.props.flags}
              {" - "}
              &quot;
              {utils.flagDescriber(QUESTION_FLAG_NAMES, this.props.flags)}
              &quot;
            </List.Description>
          </List.Content>
        </List.Item>
        {(this.props.media || this.props.editMode) &&
        <List.Item>
          <List.Icon
            name={this.props.media ? "image" : "image outline"}
            size="large"
            verticalAlign="top"
          />
          <List.Content>
            <List.Header>Media {this.props.editMode && <EditBelowIcon/>}</List.Header>
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
              {" "}
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
  handleBasicsChange: PropTypes.func,
};

QuestionDetailsBasics.defaultProps = {
  media: null,
  editMode: false,
  handleBasicsChange: null,
};

export default QuestionDetailsBasics;
