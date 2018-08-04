import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Container, Dimmer, Loader, Message } from "semantic-ui-react";

import LoadingButton from "../misc/LoadingButton";

class QaReviewSurveyEditorForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answer: `${this.props.surveyData.answer.value}`,
      note: this.props.surveyData.detail,
    };

    this.handleChange = (data) => {
      this.setState(data);
    };

    this.submit = () => {
      // TODO - Form validation

      const newValue = parseInt(this.state.answer, 10);
      // TODO - Add min/max limit handling (will need to get it here first)

      this.props.onSubmit({
        value: newValue,
        unit: this.props.surveyData.answer.unit,  // Cannot be changed, but still required.
        detail: this.state.note,
        score: newValue === this.props.surveyData.answer.value ? this.props.surveyData.score : null,
      });
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
            label={`Answer (${this.props.surveyData.answer.unit})`}
          />
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
                size: "mini",
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
      </div>
    );
  }
}

QaReviewSurveyEditorForm.propTypes = {
  surveyData: PropTypes.shape({
    answer: PropTypes.shape({
      value: PropTypes.number.isRequired,
      unit: PropTypes.string.isRequired,
    }).isRequired,
    detail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

QaReviewSurveyEditorForm.defaultProps = {
  error: null,
};

export default QaReviewSurveyEditorForm;
