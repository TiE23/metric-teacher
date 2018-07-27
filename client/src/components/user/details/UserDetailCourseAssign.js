import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { Form, Radio, Container } from "semantic-ui-react";

import utils from "../../../utils";

import LoadingButton from "../../misc/LoadingButton";

import {
  COURSE_ASSIGN_MUTATION,
} from "../../../graphql/Mutations";

class UserDetailCourseAssign extends PureComponent {
  state = {
    preference: "imperial",
  };

  handleChange = (data) => {
    this.setState(data);
  };

  render() {
    return (
      <Mutation
        mutation={COURSE_ASSIGN_MUTATION}
        update={(cache, { data: { assignStudentNewCourse } }) => {
          const data = cache.readQuery(this.props.queryInfo);
          utils.cachePushIntoArray(data, this.props.studentId, "enrollment.courses",
            assignStudentNewCourse);
          cache.writeQuery({
            ...this.props.queryInfo,
            data,
          });
        }}
      >
        {(assignStudentNewCourse, { loading, error }) => (
          <Form>
            <Form.Field>
              <Radio
                label="I am more familiar with the Metric system."
                name="preferMetric"
                value="metric"
                checked={this.state.preference === "metric"}
                onChange={() => this.handleChange({ preference: "metric" })}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="I am more familiar with the Imperial system."
                name="preferImperial"
                value="metric"
                checked={this.state.preference === "imperial"}
                onChange={() => this.handleChange({ preference: "imperial" })}
              />
            </Form.Field>
            <Form.Field>
              <Container textAlign="right" >
              <LoadingButton
                onClick={() => assignStudentNewCourse({
                  variables: {
                    studentid: this.props.studentId,
                    prefermetric: this.state.preference === "metric",
                  },
                })}
                loading={loading}
                error={error}
                buttonText="Assign New Course"
                buttonProps={{ primary: true }}
              />
              </Container>
            </Form.Field>
          </Form>
        )}
      </Mutation>
    );
  }
}

UserDetailCourseAssign.propTypes = {
  studentId: PropTypes.string.isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailCourseAssign;
