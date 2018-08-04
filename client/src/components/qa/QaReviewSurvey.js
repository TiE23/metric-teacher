import React from "react";
import PropTypes from "prop-types";
import { Grid, Segment, Label, Button } from "semantic-ui-react";

import {
  QA_DATA_QUESTION_SURVEY_RESPONSE,
} from "../../propTypes";

import QaReviewSurveyBasics from "./QaReviewSurveyBasics";

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
              size="mini"
            >
              Update Response
            </Button>
          }
          {props.closeSurveyEditor && props.surveyEditorOpen &&
            <Button
              onClick={props.closeSurveyEditor}
              floated="right"
              size="mini"
            >
              Close
            </Button>
          }
          {props.surveyEditorOpen ?
            <p>Editor</p>
            :
            <QaReviewSurveyBasics
              answer={props.surveyResponseData.answer}
              detail={props.surveyResponseData.detail}
            />
          }
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

QaReviewSurvey.propTypes = {
  surveyResponseData: QA_DATA_QUESTION_SURVEY_RESPONSE.isRequired,
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
