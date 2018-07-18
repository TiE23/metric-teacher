import React from "react";
import PropTypes from "prop-types";

import withAuth from "../../AuthHOC";

import {
  USER_TYPE_MODERATOR,
} from "../../../constants";

// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import UserDetailCourseAssign from "./UserDetailCourseAssign";
import UserDetailCourseDetails from "./UserDetailCourseDetails";

const UserDetailCourse = (props) => {
  if (props.coursesData.length) {
    return (
      <UserDetailCourseDetails
        courseData={props.coursesData[0]}
        query={props.query}
      />
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
            query={props.query}
          />
        }
      </div>
    );
  }
};

UserDetailCourse.propTypes = {
  coursesData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.array.isRequired,
    surveys: PropTypes.array.isRequired,
  })).isRequired,
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withAuth(UserDetailCourse);  // provide access to userTokenData
