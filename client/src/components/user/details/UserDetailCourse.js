import React from "react";
import PropTypes from "prop-types";

import UserDetailMasteries from "./UserDetailMasteries";

const UserDetailCourse = (props) => {
  if (props.courses.length) {
    const course = props.courses[0];
    return (
      <div>
        <p>Course ID: {course.id}</p>
        <UserDetailMasteries masteries={course.masteries} />
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
    masteries: PropTypes.array,
  })).isRequired,
};

export default UserDetailCourse;
