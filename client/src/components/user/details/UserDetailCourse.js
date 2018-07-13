import React from "react";
import PropTypes from "prop-types";

const UserDetailCourse = (props) => {
  if (props.courses.length) {
    const course = props.courses[0];
    return (
      <div>
        <p>Course ID: {course.id}</p>
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
  })).isRequired,
};

export default UserDetailCourse;
