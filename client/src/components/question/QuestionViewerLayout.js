import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Container, Button } from "semantic-ui-react";

import QuestionDetailsBasics from "./details/QuestionDetailsBasics";
import QuestionDetailsSubSubject from "./details/QuestionDetailsSubSubject";
import QuestionDetailsQuestion from "./details/QuestionDetailsQuestion";
import QuestionDetailsAnswer from "./details/QuestionDetailsAnswer";

const QuestionViewerLayout = (props) => {
  return (
    <Grid columns="equal" padded>
      <Grid.Row>
        {/* Quadrant 1 - Basic Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Basic Details</Header>
          <QuestionDetailsBasics
            {...props.qaFormData.question.basics}
            editMode={props.editorOpen}
            handleChange={props.handleChange}
          />
        </Grid.Column>
        {/* Quadrant 2 - SubSubject Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>SubSubject Details</Header>
          <QuestionDetailsSubSubject
            subSubjectId={props.qaFormData.subSubjectId}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 - Question Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Question Details</Header>
          <QuestionDetailsQuestion
            type={props.qaFormData.question.basics.type}
            {...props.qaFormData.question.questionData}
          />
        </Grid.Column>
        {/* Quadrant 4 - Answer Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Answer Details</Header>
          <QuestionDetailsAnswer
            type={props.qaFormData.question.basics.type}
            {...props.qaFormData.question.answerData}
          />
        </Grid.Column>
      </Grid.Row>
      {props.allowEditor && props.handleChange && props.openEditor &&
      <Grid.Row>
        <Grid.Column>
          <Container textAlign="right">
            <Button
              onClick={props.editorOpen ? props.closeEditor : props.openEditor}
              primary={!props.editorOpen}
            >
              {props.editorOpen ? "Close" : "Edit"}
            </Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
      }
    </Grid>
  );
};

QuestionViewerLayout.propTypes = {
  qaFormData: PropTypes.shape({
    question: PropTypes.shape({
      basics: PropTypes.object.isRequired,
      questionData: PropTypes.object.isRequired,
      answerData: PropTypes.object.isRequired,
    }).isRequired,
    subSubjectId: PropTypes.string.isRequired,
  }).isRequired,
  allowEditor: PropTypes.bool,
  editorOpen: PropTypes.bool,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  handleChange: PropTypes.func,
};

QuestionViewerLayout.defaultProps = {
  allowEditor: false,
  editorOpen: false,
  openEditor: null,
  closeEditor: null,
  handleChange: null,
};

export default QuestionViewerLayout;
