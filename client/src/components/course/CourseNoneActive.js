import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import UserDetailCourseAssign from "../user/details/UserDetailCourseAssign";

const CourseNoneActive = props => (
  <Message attached >
    <Message.Header>
      You have no Course assigned to your account!
    </Message.Header>
    <p>
      A Course tracks progress as you learn more about the measurement system you are unfamiliar
      with. Tell us what system you are more familiar with and click button below to start.
    </p>
    <UserDetailCourseAssign
      studentId={props.studentId}
      queryInfo={props.queryInfo}
    />
  </Message>
);

CourseNoneActive.propTypes = {
  studentId: PropTypes.string.isRequired,
  queryInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default CourseNoneActive;
