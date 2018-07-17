import React from "react";
import PropTypes from "prop-types";

import withAuth from "../../AuthHOC";

import {
  USER_TYPE_MODERATOR,
} from "../../../constants";

import UserDetailMasteries from "./UserDetailMasteries";
import UserDetailSurveys from "./UserDetailSurveys";
import UserDetailCourseAssign from "./UserDetailCourseAssign";

const UserDetailCourse = (props) => {
  if (props.courses.length) {
    const course = props.courses[0];
    return (
      <div>
        <p>Course ID: {course.id}</p>
        <UserDetailMasteries masteries={course.masteries} />
        <UserDetailSurveys surveys={course.surveys} />
      </div>
    );
  } else {
    // No need to check that the user type is student as only students can be enrolled.
    return (
      <div>
        <p>No active course!</p>
        {/* In addition to the student, allow moderators or better to assign a new Course */}
        {(props.studentId === props.userTokenData.id ||
          props.userTokenData.type >= USER_TYPE_MODERATOR) &&
          <UserDetailCourseAssign
            studentId={props.studentId}
            userQuery={props.userQuery}
          />
        }
      </div>
    );
  }
};

UserDetailCourse.propTypes = {
  studentId: PropTypes.string.isRequired,
  userQuery: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.array.isRequired,
    surveys: PropTypes.array.isRequired,
  })).isRequired,
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withAuth(UserDetailCourse);  // provide access to userTokenData
