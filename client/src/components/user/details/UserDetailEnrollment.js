import React from "react";
import PropTypes from "prop-types";

import withAuth from "../../AuthHOC";

import {
  USER_TYPE_MODERATOR,
} from "../../../constants";

import UserDetailEnroll from "./UserDetailEnroll";
import UserDetailEnrollmentDetails from "./UserDetailEnrollmentDetails";

const UserDetailEnrollment = (props) => {
  if (!props.userData) return null;

  const { userData, userTokenData } = props;
  const { enrollment } = userData;

  if (enrollment) {
    return (
      <UserDetailEnrollmentDetails
        enrollmentData={{ ...enrollment, student: { id: userData.id } }}
        query={props.query}
      />
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
            query={props.query}
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
      id: PropTypes.string.isRequired,
      courses: PropTypes.array,
    }),
  }),
  query: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

UserDetailEnrollment.defaultProps = {
  enrollmentData: null,
  query: null,
};

export default withAuth(UserDetailEnrollment);  // provide access to userTokenData
