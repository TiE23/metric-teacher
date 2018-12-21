import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Dimmer, Loader, Message, Label, Button } from "semantic-ui-react";
import deline from "deline";
import isDecimal from "validator/lib/isDecimal";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  SURVEY_DETAIL_MAXIMUM_LENGTH,
  QUESTION_FLAG_USER_DETAIL_OPTIONAL,
  QUESTION_FLAG_USER_DETAIL_REQUIRED,
} from "../../constants";

class QaReviewSurveyEditorForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: String(utils.t0t(this.props.answer, "")),
      note: this.props.note,
      formErrors: [],
    };

    this.handleAnswerChange = (e, { value }) => {
      const val = utils.decimalHelper(value); // Typing a "." will automatically fill to "0."
      if ((val && utils.isDecimalTyped(val)) || !val) {
        this.setState({ answer: val });
      }
    };

    this.handleNoteChange = (e, { value }) => {
      if (value.length <= SURVEY_DETAIL_MAXIMUM_LENGTH) {
        this.setState({ note: value });
      }
    };

    this.validate = () => {
      const formErrors = [];

      const inputValue = this.state.answer.trim();

      // Make sure it's a number.
      if (!isDecimal(inputValue)) {
        formErrors.push(deline`Only enter in a number for your
        answer.${inputValue.includes(",") && " Do not use commas."}`);
      } else {
        formErrors.push(...utils.surveyAnswerValidator(
          parseFloat(inputValue),
          this.props.top,
          this.props.bottom,
          this.props.unit,
          this.props.step,
        ));
      }

      // If a note is required, make sure it's filled!
      if ((this.props.questionFlags & QUESTION_FLAG_USER_DETAIL_REQUIRED) &&
        !this.state.note.trim()) {
        formErrors.push("This survey requires you have a note. Please do not leave it blank.");
      }

      return formErrors;
    };

    this.submit = () => {
      const formErrors = this.validate();
      this.setState({ formErrors });

      if (formErrors.length === 0) {
        const newValue = parseFloat(this.state.answer.trim());

        this.props.onSubmit({
          value: newValue,
          unit: this.props.unit,  // Cannot be changed, but is required.
          detail: this.state.note && this.state.note.trim(),
          score: newValue === this.props.answer ?
            this.props.score : null,
        });
      }
    };
  }

  render() {
    return (
      <div>
        <Form>
          <Dimmer inverted active={this.props.loading}>
            <Loader />
          </Dimmer>
          <Form.Input
            value={this.state.answer}
            onChange={this.handleAnswerChange}
            label="Answer - Changes will reset your progress!"
          >
            <input />
            <Label basic>
              <b>{utils.unitInitializer(this.props.unit)}</b>
            </Label>
          </Form.Input>
          {(this.state.note || !!(this.props.questionFlags &
            (QUESTION_FLAG_USER_DETAIL_OPTIONAL + QUESTION_FLAG_USER_DETAIL_REQUIRED))) &&
            <Form.Input
              value={this.state.note}
              onChange={this.handleNoteChange}
              label="Note"
            />
          }
          <div align="right">
            {this.props.closeSurveyEditor &&
            <Button
              onClick={this.props.closeSurveyEditor}
            >
              Close
            </Button>
            }
            <LoadingButton
              onClick={this.submit}
              onSuccess={this.props.closeSurveyEditor}
              buttonText="Submit"
              loading={this.props.loading}
              error={this.props.error || !!this.state.formErrors.length}
              buttonProps={{
                primary: true,
                type: "submit",
              }}
              confirmModal={this.state.answer !== String(this.props.answer)}
              modalHeaderContent="Are you sure?"
              modalContent="Updating your answer will reset your score to zero."
            />
          </div>
        </Form>
        {this.props.error &&
          <Message negative>
            <Message.Header>Error</Message.Header>
            {this.props.error.message}
          </Message>
        }
        {this.state.formErrors.length !== 0 &&
        <Message attached negative>
          <Message.Header>Form Errors</Message.Header>
          <ul>
            {this.state.formErrors.map(errorMessage => <li key={errorMessage}>{errorMessage}</li>)}
          </ul>
        </Message>
        }
      </div>
    );
  }
}

QaReviewSurveyEditorForm.propTypes = {
  answer: PropTypes.number,
  unit: PropTypes.string.isRequired,
  note: PropTypes.string,
  top: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  questionFlags: PropTypes.number.isRequired,
  closeSurveyEditor: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

QaReviewSurveyEditorForm.defaultProps = {
  answer: null,
  note: null,
  closeSurveyEditor: null,
  error: null,
};

export default QaReviewSurveyEditorForm;
