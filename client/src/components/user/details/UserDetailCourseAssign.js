import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

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
          const data = cache.readQuery({
            query: this.props.query,
            variables: { userid: this.props.studentId },
          });
          data.user.enrollment.courses.push(assignStudentNewCourse);
          cache.writeQuery({
            query: this.props.query,
            variables: { userid: this.props.studentId },
            data,
          });
        }}
      >
        {(assignStudentNewCourse, { loading, error }) => (
          <div>
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
            />
            <input
              type="radio"
              value="metric"
              checked={this.state.preference === "metric"}
              onChange={() => this.handleChange({ preference: "metric" })}
            /> Prefer Metric
            {" "}
            <input
              type="radio"
              value="imperial"
              checked={this.state.preference === "imperial"}
              onChange={() => this.handleChange({ preference: "imperial" })}
            /> Prefer Imperial
          </div>
        )}
      </Mutation>
    );
  }
}

UserDetailCourseAssign.propTypes = {
  studentId: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetailCourseAssign;
