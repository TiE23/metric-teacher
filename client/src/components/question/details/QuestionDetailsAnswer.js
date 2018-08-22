import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dropdown, Input, List, Icon, Button, Popup } from "semantic-ui-react";
import range from "lodash/range";
import cuid from "cuid";

import utils from "../../../utils";

import EditBelowIcon from "../../misc/EditBelowIcon";
import UnitDropdown from "../../misc/UnitDropdown";

import {
  MAX_CHOICES,
  MAX_CHOICES_DEFINED,
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../../constants";

const QuestionDetailsAnswer = class QuestionDetailsAnswer extends PureComponent {
  constructor(props) {
    super(props);

    // Hack-solving frustrating CSS issues with input widths
    this.width100 = { width: "100%" };

    this.handleChoicesAvailableChange = (e, { value }) => {
      if (this.props.handleAnswerDataChange) {
        this.props.handleAnswerDataChange({ multiple: { choicesOffered: value } });
      }
    };

    this.handleDetailChange = (e, { value }) => {
      if (this.props.handleAnswerDataChange) {
        this.props.handleAnswerDataChange({ detail: value });
      }
    };

    this.handleAccuracyChange = (e, { value }) => {
      const val = utils.decimalHelper(value); // Typing a "." will automatically fill to "0."
      if (this.props.handleAnswerDataChange && ((val && utils.isDecimalTyped(val)) || !val)) {
        this.props.handleAnswerDataChange({ accuracy: val }); // This is a string.
      }
    };

    this.handleUnitChange = (e, { value }) => {
      if (this.props.handleAnswerDataChange) {
        this.props.handleAnswerDataChange({ unit: value });
      }
    };

    this.handleFirstChoices = () => {
      if (this.props.handleAnswerDataChange) {
        this.props.handleAnswerDataChange({
          multiple: {
            choicesOffered: 2,
            choices: [
              { unit: "written", mixedValue: "Correct answer", cuid: cuid.slug() },
              { unit: "written", mixedValue: "Incorrect answer", cuid: cuid.slug() },
            ],
          },
        });
      }
    };

    this.handleNewChoice = () => {
      if (this.props.handleAnswerDataChange) {
        this.props.handleAnswerDataChange({
          multiple: {
            choices: [
              ...this.props.multiple.choices,
              {
                unit: "written",
                mixedValue: "Incorrect answer",
                cuid: cuid.slug(),
              },
            ],
          },
        });
      }
    };

    this.handleRemoveChoice = (index) => {
      if (this.props.handleAnswerDataChange) {
        const { choices } = this.props.multiple;
        choices.splice(index, 1);
        const choicesOffered = utils.minMax(2, this.props.multiple.choicesOffered, choices.length);
        this.props.handleAnswerDataChange({ multiple: { choices, choicesOffered } });
      }
    };

    this.handleChoiceValueChange = (index, value, unit) => {
      if (this.props.handleAnswerDataChange) {
        // Handle written input
        if (unit === "written") {
          const { choices } = this.props.multiple;
          choices[index].mixedValue = value;
          this.props.handleAnswerDataChange({ multiple: { choices } });

        // Handle number input
        } else {
          const val = utils.decimalHelper(value);
          if ((val && utils.isDecimalTyped(val)) || !val) {
            const { choices } = this.props.multiple;
            choices[index].mixedValue = val;
            this.props.handleAnswerDataChange({ multiple: { choices } });
          }
        }
      }
    };

    this.handleChoiceUnitChange = (index, unit) => {
      if (this.props.handleAnswerDataChange) {
        const { choices } = this.props.multiple;
        choices[index].unit = unit;

        // If the unit isn't written, and the value isn't a decimal, erase it.
        if (unit !== "written" && !utils.isDecimalTyped(choices[index].mixedValue)) {
          choices[index].mixedValue = "";
        }

        this.props.handleAnswerDataChange({ multiple: { choices } });
      }
    };
  }

  render() {
    return (
      <List divided>
        {this.props.type === QUESTION_TYPE_WRITTEN && this.props.multiple &&
        <List.Item>
          <List.Icon name="pencil alternate" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.editMode ?
                <Dropdown
                  onChange={this.handleChoicesAvailableChange}
                  options={
                    range(2, utils.minMax(2, this.props.multiple.choices.length, MAX_CHOICES) + 1)
                      .map(num => ({ value: num, text: `${num} Choices` }))
                  }
                  text="Choices Available"
                  value={this.props.multiple.choicesOffered || 2}
                  inline
                />
                :
                <span>Choices Available</span>
              }
              {" "}
              <Popup
                trigger={<Icon name="info circle" />}
                content="Sets how many choices the student will see at once in a question. The correct answer will be placed among randomly selected incorrect answers."
                basic
              />
            </List.Header>
            <List.Description>
              {(this.props.multiple && this.props.multiple.choicesOffered) || "Null"}
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {this.props.type === QUESTION_TYPE_WRITTEN &&
        <List.Item>
          <List.Icon name="list" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              Choices
              {" "}
              {this.props.editMode &&
              <Popup
                trigger={<Icon name="info circle" />}
                content="If desired you can add a custom unit by typing it in."
                basic
              />
              }
            </List.Header>
            {this.props.multiple ?
              <List.List>
                {this.props.multiple.choices.map((choice, index) => (
                  <List.Item
                    key={choice.cuid}
                  >
                    <List.Icon
                      name={index === 0 ? "check circle" : "remove circle"}
                      color={index === 0 ? "olive" : "red"}
                      size="large"
                      verticalAlign="top"
                    />
                    <List.Content>
                      {this.props.editMode ?
                        <List.Description>
                          <Input
                            value={choice.mixedValue || ""}
                            placeholder={choice.unit === "written" ? "Text" : "Number"}
                            transparent
                            onChange={(e, { value }) => this.handleChoiceValueChange(index, value,
                              choice.unit)}
                          />
                          {(this.props.subjectName && this.props.subSubjectToMetric !== null) ?
                            <UnitDropdown
                              onChange={(e, { value }) => this.handleChoiceUnitChange(index, value)}
                              family={this.props.subSubjectToMetric ? "metric" : "imperial"}
                              subject={this.props.subjectName.toLocaleLowerCase()}
                              value={choice.unit}
                              addWrittenOption
                              dropdownProps={{ pointing: "bottom" }}
                            />
                            :
                            <Input
                              value={choice.unit || ""}
                              placeholder="Unit"
                              transparent
                              onChange={(e, { value }) => this.handleChoiceUnitChange(index, value)}
                            />
                          }
                          {index > 1 &&
                            <Icon
                              size="large"
                              name="minus square outline"
                              color="red"
                              onClick={() => this.handleRemoveChoice(index)}
                            />
                          }
                        </List.Description>
                        :
                        <List.Description>
                          {choice.unit === "written" ? choice.mixedValue :
                            `${choice.mixedValue}${utils.unitInitilizer(choice.unit)}`}
                        </List.Description>
                      }
                    </List.Content>
                  </List.Item>
                ))}
                {this.props.editMode &&
                  <List.Item>
                    <List.Content floated="right">
                      <Popup
                        trigger={
                          <Icon
                            size="large"
                            name="plus square outline"
                            color="purple"
                            onClick={this.handleNewChoice}
                          />
                        }
                        content={this.props.multiple.choices.length >= MAX_CHOICES_DEFINED ?
                          `Max entries reached (${MAX_CHOICES_DEFINED})`
                          :
                          "Add a new choice."
                        }
                        basic
                      />
                    </List.Content>
                  </List.Item>
                }
              </List.List>
              :
              <span>
                {this.props.editMode ?
                  <Button
                    compact
                    color="olive"
                    onClick={this.handleFirstChoices}
                  >
                    Make first choices
                  </Button>
                  :
                  <p>No choices!</p>
                }
              </span>
            }
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_WRITTEN &&
        (this.props.editMode || this.props.detail)) &&
        <List.Item>
          <List.Icon name="sticky note" size="large" verticalAlign="top" />
          <List.Content style={this.width100}>
            <List.Header>
              Answer Detail
              {" "}
              {this.props.editMode && <EditBelowIcon />}
              {" "}
              <Popup
                trigger={<Icon name="info circle" />}
                content="Optional detail that will appear after the question is answered correctly. Ideally use this to explain why the answer is that way."
                basic
              />
            </List.Header>
            <List.Description>
              {this.props.editMode ?
                <div style={this.width100}>
                  <Input
                    onChange={this.handleDetailChange}
                    value={this.props.detail || ""}
                    placeholder="..."
                    transparent
                    fluid
                  />
                </div>
                :
                <span>{this.props.detail || "..."}</span>
              }
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_CONVERSION ||
        this.props.type === QUESTION_TYPE_SURVEY) &&
        <List.Item>
          <List.Icon name="exchange" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.type === QUESTION_TYPE_SURVEY ? "Survey " : ""}
              {" "}
              Conversion Requirements
            </List.Header>
            <List.List>
              <List.Item>
                <List.Icon name="crosshairs" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>
                    Accuracy
                    {" "}
                    {this.props.editMode && <EditBelowIcon />}
                    {" "}
                    <Popup
                      trigger={<Icon name="info circle" />}
                      content={`The user's answer must be within +/- ${utils.t0t(this.props.accuracy, "the accuracy value")} of the actual conversion value.`}
                      basic
                    />
                  </List.Header>
                  <List.Description>
                    {this.props.editMode ?
                      <Input
                        onChange={this.handleAccuracyChange}
                        value={this.props.accuracy || ""}
                        placeholder="Null"
                        transparent
                        fluid
                      />
                      :
                      <span>{utils.t0t(this.props.accuracy, "Null")}</span>
                    }
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dot circle outline" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>
                    To Unit
                    {" "}
                    {this.props.editMode && <EditBelowIcon />}
                    {" "}
                    {this.props.editMode &&
                    <Popup
                      trigger={<Icon name="info circle" />}
                      content="If desired you can add a custom unit by typing it in."
                      basic
                    />
                    }
                  </List.Header>
                  {this.props.editMode ?
                    <List.Description>
                      {(this.props.subjectName && this.props.subSubjectToMetric !== null) ?
                        <UnitDropdown
                          onChange={this.handleUnitChange}
                          family={this.props.subSubjectToMetric ? "metric" : "imperial"}
                          subject={this.props.subjectName.toLocaleLowerCase()}
                          value={this.props.unit}
                          dropdownProps={{ pointing: "bottom" }}
                        />
                        :
                        <Input
                          onChange={this.handleUnitChange}
                          value={this.props.unit || ""}
                          placeholder="..."
                          transparent
                          fluid
                        />
                      }
                    </List.Description>
                    :
                    <span>{utils.unitInitilizer(this.props.unit) || "..."}</span>
                  }
                </List.Content>
              </List.Item>
            </List.List>
          </List.Content>
        </List.Item>
        }
      </List>
    );
  }
};

QuestionDetailsAnswer.propTypes = {
  type: PropTypes.number.isRequired,
  detail: PropTypes.string,
  accuracy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  unit: PropTypes.string,
  multiple: PropTypes.shape({
    choicesOffered: PropTypes.number.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      unit: PropTypes.string.isRequired,
      mixedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      cuid: PropTypes.string.isRequired,
    })),
  }),
  editMode: PropTypes.bool,
  handleAnswerDataChange: PropTypes.func,
  subSubjectToMetric: PropTypes.bool,
  subjectName: PropTypes.string,
};

QuestionDetailsAnswer.defaultProps = {
  detail: null,
  accuracy: null,
  unit: null,
  multiple: null,
  editMode: false,
  handleAnswerDataChange: null,
  subSubjectToMetric: null,
  subjectName: null,
};

export default QuestionDetailsAnswer;
