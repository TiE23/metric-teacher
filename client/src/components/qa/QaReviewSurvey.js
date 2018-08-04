import React from "react";
import { Grid, Segment, Label, List } from "semantic-ui-react";

import utils from "../../utils";

import {
  QA_DATA_QUESTION_SURVEY_RESPONSE,
} from "../../propTypes";

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
          <List>
            <List.Item>
              <b>Answer</b>: {utils.choiceWorder(props.surveyResponseData.answer)}
            </List.Item>
            {props.surveyResponseData.detail &&
              <List.Item>
                <b>Note</b>: &quot;{props.surveyResponseData.detail}&quot;
              </List.Item>
            }
          </List>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

QaReviewSurvey.propTypes = {
  surveyResponseData: QA_DATA_QUESTION_SURVEY_RESPONSE.isRequired,
};

export default QaReviewSurvey;
