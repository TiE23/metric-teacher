import React from "react";
import PropTypes from "prop-types";

import UserDetailMasteries from "./UserDetailMasteries";
import UserDetailSurveys from "./UserDetailSurveys";

const UserDetailCourseDetails = props => (
  <div>
    <p>Course ID: {props.courseData.id}</p>
    <UserDetailMasteries
      masteries={props.courseData.masteries}
      queryInfo={props.queryInfo}
    />
    <UserDetailSurveys
      surveys={props.courseData.surveys}
    />
  </div>
);

UserDetailCourseDetails.propTypes = {
  courseData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.arrayOf(PropTypes.object),
    surveys: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailCourseDetails;
