import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Container, Dimmer, Loader, Message, Label } from "semantic-ui-react";
import deline from "deline";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  QA_UNIT_OBJECT_TYPE,
  QA_RANGE_OBJECT_TYPE,
} from "../../propTypes";

class QaReviewSurveyEditorForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: `${this.props.surveyData.answer.value}`,
      note: this.props.surveyData.detail,
      formErrors: [],
    };

    this.handleChange = (data) => {
      this.setState(data);
    };

    this.validate = () => {
      const formErrors = [];
      const newValue = parseInt(this.state.answer, 10);

      // Force min/max limits.
      const top = this.props.surveyRangeData.top.value;
      const bottom = this.props.surveyRangeData.bottom.value;
      const unit = utils.unitInitilizer(this.props.surveyRangeData.top.unit);

      if (newValue > top) {
        formErrors.push(deline`You answer ${newValue}${unit}
          is greater than the acceptable maximum value of ${top}${unit}.`);
      }
      if (newValue < bottom) {
        formErrors.push(deline`Your answer ${newValue}${unit}
          is lower than the acceptable minimum value of ${bottom}${unit}.`);
      }

      return formErrors;
    };

    this.submit = () => {
      const formErrors = this.validate();
      this.setState({ formErrors });

      if (formErrors.length === 0) {
        const newValue = parseInt(this.state.answer, 10);

        this.props.onSubmit({
          value: newValue,
          unit: this.props.surveyData.answer.unit,  // Cannot be changed, but still required.
          detail: this.state.note,
          score: newValue === this.props.surveyData.answer.value ?
            this.props.surveyData.score : null,
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
            label="Answer (Changing this will reset your progress!)"
          >
            <input />
            <Label basic>
              <b>{utils.unitInitilizer(this.props.surveyData.answer.unit)}</b>
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
  surveyData: PropTypes.shape({
    answer: QA_UNIT_OBJECT_TYPE.isRequired,
    detail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  surveyRangeData: QA_RANGE_OBJECT_TYPE.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

QaReviewSurveyEditorForm.defaultProps = {
  error: null,
};

export default QaReviewSurveyEditorForm;
