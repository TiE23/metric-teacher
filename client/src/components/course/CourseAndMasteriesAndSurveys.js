import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Segment, Message, Header, Icon, Checkbox, Container } from "semantic-ui-react";

import UserDetailMasteries from "../user/details/UserDetailMasteries";
import UserDetailSurveys from "../user/details/UserDetailSurveys";

import {
  COURSE_FLAG_PREFER_METRIC,
} from "../../constants";

class CourseAndMasteriesAndSurveys extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      organizeBySubject: true,
    };
  }

  render() {
    return (
      <div>
        <Message attached color="olive">
          <Message.Header>
            Active Course
          </Message.Header>
          <Message.Content>
            &quot;I am more familiar with the {" "}
            {this.props.courseData.flags & COURSE_FLAG_PREFER_METRIC ?
              "Metric" : "Imperial"} system.&quot;
          </Message.Content>
        </Message>
        <Segment attached >
          <Header size="medium" textAlign="center">
            Masteries
          </Header>
          <UserDetailMasteries
            masteriesData={this.props.courseData.masteries}
            queryInfo={this.props.queryInfo}
            organizeBySubject={this.state.organizeBySubject}
            subjectCompactView
          />
          <br />
          <Container textAlign="right">
            <Checkbox
              toggle
              label="Group by Subject"
              checked={this.state.organizeBySubject}
              onChange={() => this.setState({ organizeBySubject: !this.state.organizeBySubject })}
            />
          </Container>
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
            surveys={this.props.courseData.surveys}
            queryInfo={this.props.queryInfo}
          />
          <br />
          <p>
            <Icon name="info circle" /> {" "}
            Surveys are personalized questions found during challenges that quiz you on measurements
            that matter to you - such as your weight or how far your work or school is from your
            home.
          </p>
        </Segment>
      </div>
    );
  }
}

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
