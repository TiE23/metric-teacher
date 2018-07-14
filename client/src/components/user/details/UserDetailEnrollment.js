import React from "react";
import PropTypes from "prop-types";

import withAuth from "../../AuthHOC";

import UserDetailCourse from "./UserDetailCourse";
import UserDetailEnroll from "./UserDetailEnroll";

const UserDetailEnrollment = (props) => {
  if (!props.queryData) return null;

  const { user } = props.queryData.data;
  const { enrollment } = props.queryData.data.user;

  if (enrollment) {
    return (
      <div>
        <p>Enrollment ID: {enrollment.id}</p>
        <UserDetailCourse
          courses={enrollment.courses}
          studentId={user.id}
          userQuery={props.userQuery}
        />
      </div>
    );
  // Only show Enroll button for students.
  } else if (user.type === 0) {
    return (
      <div>
        <p>Not enrolled!</p>
        {/* In addition to the student, allow moderators or better to Enroll the student */}
        {(user.id === props.userTokenData.id || props.userTokenData.type >= 2) &&
          <UserDetailEnroll
            studentId={user.id}
            userQuery={props.userQuery}
          />
        }
      </div>
    );
  } else {
    return null;
  }
};

UserDetailEnrollment.propTypes = {
  userQuery: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  queryData: PropTypes.shape({
    data: PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.number.isRequired,
      }).isRequired,
      enrollment: PropTypes.shape({
        id: PropTypes.string.isRequired,
        courses: PropTypes.array,
      }), // Not required.
    }).isRequired,
  }),
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

UserDetailEnrollment.defaultProps = {
  queryData: null,
};

export default withAuth(UserDetailEnrollment);  // provide access to userTokenData
