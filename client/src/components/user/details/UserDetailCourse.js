import React from "react";
import PropTypes from "prop-types";

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
        <UserDetailCourseAssign
          studentId={props.studentId}
          userQuery={props.userQuery}
        />
      </div>
    );
  }
};

UserDetailCourse.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.array.isRequired,
    surveys: PropTypes.array.isRequired,
  })).isRequired,
  studentId: PropTypes.string.isRequired,
  userQuery: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default UserDetailCourse;
