import React from "react";
import PropTypes from "prop-types";

import withAuth from "../AuthHOC";

import {
  USER_TYPE_MODERATOR,
} from "../../constants";

import CourseAndMasteriesAndSurveys from "../course/CourseAndMasteriesAndSurveys";
import CourseNoneActive from "../course/CourseNoneActive";

const UserDetailCourse = (props) => {
  if (props.coursesData.length) {
    return (
      <CourseAndMasteriesAndSurveys
        courseData={props.coursesData[0]}
        queryInfo={props.queryInfo}
      />
    );
  } else {
    return (
      <CourseNoneActive
        studentId={props.studentId}
        queryInfo={props.queryInfo}
        assignAvailable={props.studentId === props.userTokenData.id ||
          props.userTokenData.type >= USER_TYPE_MODERATOR}
      />
    );
  }
};

UserDetailCourse.propTypes = {
  coursesData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.array.isRequired,
    surveys: PropTypes.array.isRequired,
  })).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  studentId: PropTypes.string.isRequired,
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default withAuth(UserDetailCourse);  // provide access to userTokenData
