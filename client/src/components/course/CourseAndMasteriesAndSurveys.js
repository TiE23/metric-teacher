import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Segment, Message, Header, Icon } from "semantic-ui-react";

import UserDetailMasteries from "../user/details/UserDetailMasteries";
import UserDetailSurveys from "../user/details/UserDetailSurveys";

import {
  COURSE_FLAG_PREFER_METRIC,
} from "../../constants";

const CourseAndMasteriesAndSurveys = props => (
  <div>
    <Message attached color="olive">
      <Message.Header>
        Active Course
      </Message.Header>
      <Message.Content>
        &quot;I am more familiar with the {" "}
        {props.courseData.flags & COURSE_FLAG_PREFER_METRIC ?
          "Metric" : "Imperial"} system.&quot;
      </Message.Content>
    </Message>
    <Segment attached >
      <Header size="medium" textAlign="center">
        Masteries
      </Header>
      <UserDetailMasteries
        masteries={props.courseData.masteries}
        queryInfo={props.queryInfo}
        organizeBySubject
        subjectCompactView
      />
      <br />
      <p>
        <Icon name="info circle" />
        Assign new subjects to master by visiting the {" "}
        <Link
          to="/subjects"
        >
          Subjects page
        </Link>.
      </p>
    </Segment>
    <Segment attached >
      <Header size="medium" textAlign="center">
        Surveys
      </Header>
      <UserDetailSurveys
        surveys={props.courseData.surveys}
        queryInfo={props.queryInfo}
      />
    </Segment>
  </div>
);

CourseAndMasteriesAndSurveys.propTypes = {
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

export default CourseAndMasteriesAndSurveys;
