import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Form, Message } from "semantic-ui-react";

import utils from "../../../../utils";

import LoadingButton from "../../../misc/LoadingButton";

import {
  USER_TYPE_DROPDOWN,
  USER_STATUS_DROPDOWN,
  USER_FLAG_DROPDOWN,
} from "../../../../constants";

class FeedbackCreatorForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: props.initType,
      status: props.initStatus,
      flags: utils.explodeBits(props.initFlags),
    };

    this.handleTypeChange = (e, { value }) => this.setState({ type: value });
    this.handleStatusChange = (e, { value }) => this.setState({ status: value });
    this.handleFlagsChange = (e, { value }) => this.setState({ flags: value });

    this.submit = () => {
      this.props.onSubmit({
        type: this.state.type,
        status: this.state.status,
        flags: utils.implodeBits(this.state.flags),
      });
    };
  }

  render() {
    return (
      <React.Fragment>
        <Form>
          <Form.Group widths="equal">
            <Form.Select
              label="Type"
              options={USER_TYPE_DROPDOWN}
              value={this.state.type}
              onChange={this.handleTypeChange}
              selection
            />
            <Form.Select
              label="Status"
              options={USER_STATUS_DROPDOWN}
              value={this.state.status}
              onChange={this.handleStatusChange}
              selection
            />
            <Form.Select
              label="Flags"
              options={USER_FLAG_DROPDOWN}
              value={this.state.flags}
              onChange={this.handleFlagsChange}
              multiple
              selection
            />
          </Form.Group>
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
          <Message.Header>Update Complete</Message.Header>
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

FeedbackCreatorForm.propTypes = {
  initType: PropTypes.number.isRequired,
  initStatus: PropTypes.number.isRequired,
  initFlags: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  success: PropTypes.bool,
};

FeedbackCreatorForm.defaultProps = {
  error: null,
  success: false,
};

export default FeedbackCreatorForm;
