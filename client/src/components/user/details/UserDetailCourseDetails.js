import React from "react";
import PropTypes from "prop-types";
import { Segment, Message } from "semantic-ui-react";

import UserDetailMasteries from "./UserDetailMasteries";
import UserDetailSurveys from "./UserDetailSurveys";

import {
  COURSE_FLAG_PREFER_METRIC,
} from "../../../constants";

const UserDetailCourseDetails = props => (
  <div>
    <Message attached color="olive" >
      <Message.Header>
        Course - {" "}
        <i>
          &quot;I am more familiar with the {" "}
          {props.courseData.flags & COURSE_FLAG_PREFER_METRIC ?
            "Metric" : "Imperial"} system&quot;
        </i>
      </Message.Header>
    </Message>
    <Segment attached >
      <p>Mastery</p>
      <UserDetailMasteries
        masteries={props.courseData.masteries}
        queryInfo={props.queryInfo}
        organizeBySubject
        subjectCompactView
      />
      <UserDetailSurveys
        surveys={props.courseData.surveys}
      />
    </Segment>
  </div>
);

UserDetailCourseDetails.propTypes = {
  courseData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    masteries: PropTypes.arrayOf(PropTypes.object),
    surveys: PropTypes.arrayOf(PropTypes.object),
    flags: PropTypes.number.isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
};

export default UserDetailCourseDetails;
