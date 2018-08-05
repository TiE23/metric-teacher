import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Container, Dimmer, Loader, Message, Label } from "semantic-ui-react";
import deline from "deline";
import isDecimal from "validator/lib/isDecimal";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  QA_DATA_QUESTION_SURVEY,
} from "../../propTypes";

class QaReviewSurveyEditorForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: `${this.props.surveyData.response.answer.value}`,
      note: this.props.surveyData.response.detail,
      formErrors: [],
    };

    this.handleChange = (data) => {
      this.setState(data);
    };

    this.validate = () => {
      const { surveyData } = this.props;
      const formErrors = [];

      // Make sure it's a number.
      if (!isDecimal(this.state.answer)) {
        formErrors.push(deline`Only enter in a number for your
        answer.${this.state.answer.includes(",") && " Do not use commas."}`);
      } else {
        formErrors.push(...utils.surveyAnswerValidator(
          parseFloat(this.state.answer),
          surveyData.range.top.value,
          surveyData.range.bottom.value,
          surveyData.range.top.unit,
          surveyData.step,
        ));
      }

      return formErrors;
    };

    this.submit = () => {
      const formErrors = this.validate();
      this.setState({ formErrors });

      if (formErrors.length === 0) {
        const newValue = parseFloat(this.state.answer);

        this.props.onSubmit({
          value: newValue,
          unit: this.props.surveyData.response.answer.unit,  // Cannot be changed, but is required.
          detail: this.state.note,
          score: newValue === this.props.surveyData.response.answer.value ?
            this.props.surveyData.response.score : null,
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
            onChange={e => this.handleChange({ answer: e.target.value })}
            label="Answer - Changes will reset your progress!"
          >
            <input />
            <Label basic>
              <b>{utils.unitInitilizer(this.props.surveyData.response.answer.unit)}</b>
            </Label>
          </Form.Input>
          <Form.Input
            value={this.state.note}
            onChange={e => this.handleChange({ note: e.target.value })}
            label="Note"
          />
          <Container textAlign="right">
            <LoadingButton
              onClick={this.submit}
              buttonText="Submit"
              loading={this.props.loading}
              buttonProps={{
                primary: true,
                type: "submit",
              }}
            />
          </Container>
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
            {this.state.formErrors.map(errorMessage =>
              <li key={errorMessage}>{errorMessage}</li>)}
          </ul>
        </Message>
        }
      </div>
    );
  }
}

QaReviewSurveyEditorForm.propTypes = {
  surveyData: QA_DATA_QUESTION_SURVEY.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

QaReviewSurveyEditorForm.defaultProps = {
  error: null,
};

export default QaReviewSurveyEditorForm;
