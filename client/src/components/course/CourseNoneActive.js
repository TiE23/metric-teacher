import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import UserDetailCourseAssign from "../user/UserDetailCourseAssign";

const CourseNoneActive = props => (
  <Message attached>
    <Message.Header>
      There is no Course assigned to this account!
    </Message.Header>
    <p>
      A Course tracks a student&apos;s progress as they learn more about converting between Metric
      and US Customary Unit systems.
    </p>
    {props.assignAvailable &&
      <p>
        Tell us what system you are more familiar with and click the button below to start.
      </p>
    }
    {props.assignAvailable &&
      <UserDetailCourseAssign
        studentId={props.studentId}
        queryInfo={props.queryInfo}
      />
    }
  </Message>
);

CourseNoneActive.propTypes = {
  studentId: PropTypes.string.isRequired,
  queryInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  assignAvailable: PropTypes.bool,
};

CourseNoneActive.defaultProps = {
  assignAvailable: false,
};

export default CourseNoneActive;
