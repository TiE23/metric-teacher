import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Label, Button } from "semantic-ui-react";

import {
  QA_DATA_QUESTION_SURVEY,
} from "../../propTypes";

import QaReviewSurveyBasics from "./QaReviewSurveyBasics";
import QaReviewSurveyEditor from "./QaReviewSurveyEditor";

const QaReviewSurvey = props => (
  <Grid
    stackable
    stretched
    padded
    columns="equal"
  >
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Label color="olive" ribbon>
            Survey Response
          </Label>
          {props.openSurveyEditor && !props.surveyEditorOpen &&
            <Button
              onClick={props.openSurveyEditor}
              primary
              floated="right"
            >
              Update Response
            </Button>
          }
          {props.closeSurveyEditor && props.surveyEditorOpen &&
            <Button
              onClick={props.closeSurveyEditor}
              floated="right"
            >
              Close
            </Button>
          }
          {props.surveyEditorOpen ?
            <QaReviewSurveyEditor
              surveyData={props.surveyData}
              queryInfo={props.queryInfo}
              studentId={props.studentId}
              questionId={props.questionId}
              questionFlags={props.questionFlags}
              closeSurveyEditor={props.closeSurveyEditor}
            />
            :
            <QaReviewSurveyBasics
              answer={props.surveyData.response.answer}
              detail={props.surveyData.response.detail}
              questionFlags={props.questionFlags}
            />
          }
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

QaReviewSurvey.propTypes = {
  surveyData: QA_DATA_QUESTION_SURVEY.isRequired,
  queryInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  questionFlags: PropTypes.number.isRequired,
  surveyEditorOpen: PropTypes.bool,
  openSurveyEditor: PropTypes.func,
  closeSurveyEditor: PropTypes.func,
};

QaReviewSurvey.defaultProps = {
  surveyEditorOpen: false,
  openSurveyEditor: null,
  closeSurveyEditor: null,
};

export default QaReviewSurvey;
