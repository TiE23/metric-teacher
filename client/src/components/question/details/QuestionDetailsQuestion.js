import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { List, Input, TextArea, Popup, Icon } from "semantic-ui-react";

import utils from "../../../utils";

import EditBelowIcon from "../../misc/EditBelowIcon";
import UnitDropdown from "../../misc/UnitDropdown";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_CONVERSION,
  QUESTION_TYPE_SURVEY,
} from "../../../constants";

class QuestionDetailsQuestion extends PureComponent {
  constructor(props) {
    super(props);

    // Hack-solving frustrating CSS issues with input widths
    this.width100 = { width: "100%" };

    this.handleTextChange = (e, { value }) => {
      if (this.props.handleQuestionDataChange && !value.includes("\n")) { // No newlines!
        this.props.handleQuestionDataChange({ text: value });
      }
    };

    this.handleDetailChange = (e, { value }) => {
      if (this.props.handleQuestionDataChange) {
        this.props.handleQuestionDataChange({ detail: value });
      }
    };

    this.handleRangeLowerChange = (e, { value }) => {
      const val = utils.decimalHelper(value); // Typing a "." will automatically fill to "0."
      if (this.props.handleQuestionDataChange && ((val && utils.isDecimalTyped(val)) || !val)) {
        this.props.handleQuestionDataChange({ range: { lower: val } }); // This is a string.
      }
    };

    this.handleRangeUpperChange = (e, { value }) => {
      const val = utils.decimalHelper(value);
      if (this.props.handleQuestionDataChange && ((val && utils.isDecimalTyped(val)) || !val)) {
        this.props.handleQuestionDataChange({ range: { upper: val } }); // This is a string.
      }
    };

    this.handleRangeUnitChange = (e, { value }) => {
      if (this.props.handleQuestionDataChange) {
        this.props.handleQuestionDataChange({ range: { unit: value.toLocaleLowerCase() } });
      }
    };

    this.handleRangeStepChange = (e, { value }) => {
      const val = utils.decimalHelper(value);
      if (this.props.handleQuestionDataChange && ((val && utils.isDecimalTyped(val)) || !val)) {
        this.props.handleQuestionDataChange({ range: { step: val } }); // This is a string.
      }
    };
  }

  render() {
    return (
      <List divided>
        {(this.props.type === QUESTION_TYPE_WRITTEN || this.props.type === QUESTION_TYPE_SURVEY) &&
        <List.Item>
          <List.Icon name="comment" size="large" verticalAlign="top" />
          <List.Content style={this.width100}>
            <List.Header>Text {this.props.editMode && <EditBelowIcon />}</List.Header>
            <List.Description>
              {this.props.editMode ?
                <TextArea
                  onChange={this.handleTextChange}
                  value={this.props.text}
                  placeholder="This is required..."
                  style={this.width100}
                  autoHeight
                />
                :
                <span>{(this.props.text && `"${this.props.text}"`) || "..."}</span>
              }
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {(this.props.type === QUESTION_TYPE_CONVERSION &&
        (this.props.detail || this.props.editMode)) &&
        <List.Item>
          <List.Icon name="comment alternate" size="large" verticalAlign="top" />
          <List.Content style={this.width100}>
            <List.Header>Detail {this.props.editMode && <EditBelowIcon />}</List.Header>
            <List.Description>
              {this.props.editMode ?
                <div style={this.width100}>
                  <Input
                    onChange={this.handleDetailChange}
                    value={this.props.detail}
                    placeholder="..."
                    transparent
                    fluid
                  />
                </div>
                :
                <span>{(this.props.detail && `"${this.props.detail}"`) || "..."}</span>
              }
            </List.Description>
          </List.Content>
        </List.Item>
        }
        {((this.props.type === QUESTION_TYPE_CONVERSION || this.props.type === QUESTION_TYPE_SURVEY)
        && (this.props.range || this.props.editMode)) &&
        <List.Item>
          <List.Icon name="chart bar" size="large" verticalAlign="top" />
          <List.Content>
            <List.Header>
              {this.props.type === QUESTION_TYPE_CONVERSION ? "Conversion" : "Survey"} Range {" "}
              <Popup
                trigger={<Icon name="info circle" />}
                content={this.props.type === QUESTION_TYPE_CONVERSION ?
                  "A conversion question will be generated asking the student to convert a value randomly picked within the range below from one unit to another."
                  :
                  "The student will be asked to give their answer in the unit below. Only a value within the range below will be accepted."
                }
                basic
              />
            </List.Header>
            <List.List>
              <List.Item>
                <List.Icon name="chevron up" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>Upper Range {this.props.editMode && <EditBelowIcon />}</List.Header>
                  <List.Description>
                    {this.props.editMode ?
                      <Input
                        onChange={this.handleRangeUpperChange}
                        value={this.props.range && this.props.range.upper}
                        placeholder="Null"
                        transparent
                        fluid
                      />
                      :
                      <span>{(this.props.range && this.props.range.upper) || "Null"}</span>
                    }
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="chevron down" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>Lower Range {this.props.editMode && <EditBelowIcon />}</List.Header>
                  <List.Description>
                    {this.props.editMode ?
                      <Input
                        onChange={this.handleRangeLowerChange}
                        value={this.props.range && this.props.range.lower}
                        placeholder="Null"
                        transparent
                        fluid
                      />
                      :
                      <span>{(this.props.range && this.props.range.lower) || "Null"}</span>
                    }
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="sort" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>
                    Step {this.props.editMode && <EditBelowIcon />} {" "}
                    <Popup
                      trigger={<Icon name="info circle" />}
                      content={this.props.type === QUESTION_TYPE_CONVERSION ?
                        `The question will randomly pick a multiple of ${(this.props.range && this.props.range.step) || 1} between the upper and lower ranges.`
                        :
                        `The survey will expect the student to write their answer as a multiple of ${(this.props.range && this.props.range.step) || 1} between the upper and lower ranges.`
                      }
                    />
                  </List.Header>
                  <List.Description>
                    {this.props.editMode ?
                      <Input
                        onChange={this.handleRangeStepChange}
                        value={this.props.range && this.props.range.step}
                        placeholder="Null"
                        transparent
                        fluid
                      />
                      :
                      <span>{(this.props.range && this.props.range.step) || "Null"}</span>
                    }
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="dot circle" size="large" verticalAlign="top" />
                <List.Content>
                  <List.Header>
                    From Unit {this.props.editMode && <EditBelowIcon />} {" "}
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
                          onChange={this.handleRangeUnitChange}
                          family={this.props.subSubjectToMetric ? "imperial" : "metric"}
                          subject={this.props.subjectName.toLocaleLowerCase()}
                          value={this.props.range && this.props.range.unit}
                          dropdownProps={{ pointing: "bottom" }}
                        />
                        :
                        <Input
                          onChange={this.handleRangeUnitChange}
                          value={this.props.range && this.props.range.unit}
                          placeholder="..."
                          transparent
                          fluid
                        />
                      }
                    </List.Description>
                    :
                    <List.Description>
                      {(this.props.range && utils.unitInitilizer(this.props.range.unit)) || "..."}
                    </List.Description>
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
}

QuestionDetailsQuestion.propTypes = {
  text: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  type: PropTypes.number.isRequired,
  range: PropTypes.shape({
    upper: PropTypes.number.isRequired,
    lower: PropTypes.number.isRequired,
    unit: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  }),
  editMode: PropTypes.bool,
  handleQuestionDataChange: PropTypes.func,
  subSubjectToMetric: PropTypes.bool,
  subjectName: PropTypes.string,
};

QuestionDetailsQuestion.defaultProps = {
  range: null,
  editMode: false,
  handleQuestionDataChange: null,
  subSubjectToMetric: null,
  subjectName: null,
};

export default QuestionDetailsQuestion;
