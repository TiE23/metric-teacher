import React from "react";
import PropTypes from "prop-types";

import UserDetailMasteries from "./UserDetailMasteries";
import UserDetailSurveys from "./UserDetailSurveys";

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
    return (
      <div>
        <p>No active course!</p>
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
};

export default UserDetailCourse;
