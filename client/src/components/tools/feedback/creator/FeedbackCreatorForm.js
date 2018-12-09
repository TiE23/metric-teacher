import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Form, Message } from "semantic-ui-react";

import LoadingButton from "../../../misc/LoadingButton";

import {
  SITE_NAME,
  QUESTION_FEEDBACK_MAXIMUM_LENGTH,
  QUESTION_FEEDBACK_TYPE_DROPDOWN,
  QUESTION_FEEDBACK_TYPE_GENERAL,
} from "../../../../constants";

class FeedbackCreatorForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      text: "",
      formErrors: [],
    };

    this.handleTypeChange = (e, { value }) => {
      this.setState({ type: value });
    };

    this.handleTextChange = (e, { value }) => {
      if (value.length <= QUESTION_FEEDBACK_MAXIMUM_LENGTH) {
        this.setState({ text: value });
      }
    };

    this.validate = () => {
      const formErrors = [];

      if (this.state.type === QUESTION_FEEDBACK_TYPE_GENERAL &&
        this.state.text.trim().length === 0
      ) {
        formErrors.push("General feedback requires details");
      }

      return formErrors;
    };

    this.submit = () => {
      const formErrors = this.validate();
      this.setState({ formErrors });

      // Fire off the mutation if everything was acceptable.
      if (formErrors.length === 0) {
        this.props.onSubmit({
          type: this.state.type,
          text: this.state.text,
        });
      }
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Select
            value={this.state.type}
            onChange={this.handleTypeChange}
            options={QUESTION_FEEDBACK_TYPE_DROPDOWN}
            label="Feedback Type"
          />
          <Form.TextArea
            value={this.state.text}
            onChange={this.handleTextChange}
            label="Details"
            required={this.state.type === QUESTION_FEEDBACK_TYPE_GENERAL}
            placeholder={
              `Elaborate on your feedback (${QUESTION_FEEDBACK_MAXIMUM_LENGTH} character limit)`
            }
          />
          <Container textAlign="right">
            <LoadingButton
              onClick={this.submit}
              buttonText="Submit"
              buttonProps={{
                primary: true,
                type: "submit",
                disabled: this.props.success,
              }}
              loading={this.props.loading}
            />
          </Container>
        </Form>
        {this.props.success &&
        <Message attached positive>
          <Message.Header>Feedback Received</Message.Header>
          Thank you for helping make {SITE_NAME} better!
        </Message>
        }

        {this.props.error &&
        <Message attached negative>
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
      </React.Fragment>
    );
  }
}

FeedbackCreatorForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  success: PropTypes.any,
};

FeedbackCreatorForm.defaultProps = {
  error: null,
  success: false,
};

export default FeedbackCreatorForm;
