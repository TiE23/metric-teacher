import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Form, Message } from "semantic-ui-react";

import LoadingButton from "../../../misc/LoadingButton";

import {
  FEEDBACK_STATUS_DROPDOWN,
} from "../../../../constants";

class FeedbackEditorForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      newStatus: props.initFeedbackStatus,
    };

    this.handleStatusChange = (e, { value }) => {
      this.setState({ newStatus: value });
    };

    this.submit = () => {
      this.props.onSubmit({
        status: this.state.newStatus,
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Select
            value={this.state.newStatus}
            onChange={this.handleStatusChange}
            options={FEEDBACK_STATUS_DROPDOWN}
            label="New Status"
          />
          <Container textAlign="right">
            <LoadingButton
              onClick={this.submit}
              buttonText="Submit"
              buttonProps={{
                primary: true,
                type: "submit",
                disabled:
                  this.props.success || this.state.newStatus === this.props.initFeedbackStatus,
              }}
              loading={this.props.loading}
            />
          </Container>
        </Form>

        {this.props.success &&
        <Message attached positive>
          <Message.Header>Feedback Status Updated</Message.Header>
        </Message>
        }

        {this.props.error &&
        <Message attached negative>
          <Message.Header>Error</Message.Header>
          {this.props.error.message}
        </Message>
        }
      </React.Fragment>
    );
  }
}

FeedbackEditorForm.propTypes = {
  initFeedbackStatus: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  success: PropTypes.bool,
};

FeedbackEditorForm.defaultProps = {
  initFeedbackStatus: 0,
  error: null,
  success: false,
};

export default FeedbackEditorForm;
