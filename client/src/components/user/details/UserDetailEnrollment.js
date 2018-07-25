import React from "react";
import PropTypes from "prop-types";

import withAuth from "../../AuthHOC";

import {
  USER_TYPE_MODERATOR,
} from "../../../constants";

import UserDetailCourse from "./UserDetailCourse";
import Enrollment from "../../enrollment/Enrollment";
import UserDetailEnroll from "./UserDetailEnroll";

const UserDetailEnrollment = (props) => {
  if (!props.userData) return null;

  const { userData, userTokenData } = props;
  const { enrollment } = userData;

  if (enrollment) {
    return (
      <div>
        <Enrollment
          enrollmentData={enrollment}
        />
        <UserDetailCourse
          coursesData={enrollment.courses}
          studentId={userData.id}
          queryInfo={props.queryInfo}
        />
      </div>
    );
  // Only show Enroll button for students.
  } else if (userData.type === 0) {
    return (
      <div>
        <p>Not enrolled!</p>
        {/* In addition to the student, allow moderators or better to Enroll the student */}
        {(userData.id === userTokenData.id || userTokenData.type >= USER_TYPE_MODERATOR) &&
          <UserDetailEnroll
            studentId={userData.id}
            queryInfo={props.queryInfo}
          />
        }
      </div>
    );
  } else {
    return null;
  }
};

UserDetailEnrollment.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
    enrollment: PropTypes.shape({
      courses: PropTypes.array,
    }),
  }),
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withAuth(UserDetailEnrollment);  // provide access to userTokenData
