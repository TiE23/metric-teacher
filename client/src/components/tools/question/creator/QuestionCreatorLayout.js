import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Container, Button, Message } from "semantic-ui-react";

import utils from "../../../../utils";

import QuestionDetailsBasics from "./details/QuestionDetailsBasics";
import QuestionDetailsSubSubject from "./details/QuestionDetailsSubSubject";
import QuestionDetailsQuestion from "./details/QuestionDetailsQuestion";
import QuestionDetailsAnswer from "./details/QuestionDetailsAnswer";
import LoadingButton from "../../../misc/LoadingButton";

const QuestionCreatorLayout = props => (
  // TODO - Consider making PureComponent and splitting up handler funcs before passing to children.
  // TODO - Set loading and error to state and reset error state and re-try.
  <Grid columns="equal" padded>
    <Grid.Row>
      {/* Quadrant 1 - Basic Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>Basic Details</Header>
        <QuestionDetailsBasics
          {...props.qaFormData.question.basics}
          editMode={props.editorOpen || props.newQuestionMode}
          newQuestionMode={props.newQuestionMode}
          handleBasicsChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleBasicsChange}
        />
      </Grid.Column>
      {/* Quadrant 2 - SubSubject Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>SubSubject Details</Header>
        <QuestionDetailsSubSubject
          subSubjectId={props.qaFormData.subSubjectId}
          editMode={props.editorOpen || props.newQuestionMode}
          handleSubSubjectChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleSubSubjectChange}
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
          editMode={props.editorOpen || props.newQuestionMode}
          handleQuestionDataChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleQuestionDataChange}
          subSubjectToMetric={props.qaFormData.subSubjectToMetric}
          subjectName={props.qaFormData.subjectName}
        />
      </Grid.Column>
      {/* Quadrant 4 - Answer Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>Answer Details</Header>
        <QuestionDetailsAnswer
          type={props.qaFormData.question.basics.type}
          {...props.qaFormData.question.answerData}
          editMode={props.editorOpen || props.newQuestionMode}
          handleAnswerDataChange={props.handleChangeFunctions &&
          props.handleChangeFunctions.handleAnswerDataChange}
          subSubjectToMetric={props.qaFormData.subSubjectToMetric}
          subjectName={props.qaFormData.subjectName}
        />
      </Grid.Column>
    </Grid.Row>
    {props.onSubmitError && (props.openEditor || props.newQuestionMode) &&
    <Grid.Row>
      <Grid.Column>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{props.onSubmitError.message}</p>
        </Message>
      </Grid.Column>
    </Grid.Row>
    }
    {props.allowEditor && props.handleChangeFunctions &&
    (props.openEditor || props.newQuestionMode) &&
    <Grid.Row>
      <Grid.Column>
        <Container textAlign="right">
          {props.editorOpen || props.newQuestionMode ?
            <span>
              {!props.newQuestionMode &&
              <LoadingButton
                onClick={() => {
                  props.resetChanges();
                  props.closeEditor();
                }}
                buttonProps={{ color: props.unsavedChanges ? "orange" : "olive" }}
                buttonText={props.unsavedChanges ? "Cancel" : "Close"}
                confirmModal={props.unsavedChanges}
                modalHeaderContent="Cancel Changes"
                modalProps={{
                  basic: true,
                  size: "small",
                }}
              />
              }
              <LoadingButton
                onClick={() => {
                  props.onSubmit({
                    variables: utils.composeQaInputFromFormData(props.qaFormData,
                      props.newQuestionMode),
                  });
                }}
                loading={props.onSubmitLoading}
                buttonProps={{
                  primary: true,
                  disabled: !props.unsavedChanges || props.newQuestionSubmitted,
                }}
                buttonText={props.newQuestionSubmitted ? "New Question Submitted" : "Submit"}
                confirmModal
                modalHeaderContent="Submit Changes"
                modalProps={{
                  basic: true,
                  size: "small",
                }}
              />
            </span>
            :
            <Button onClick={props.openEditor} primary>Edit</Button>
          }
        </Container>
      </Grid.Column>
    </Grid.Row>
    }
  </Grid>
);

QuestionCreatorLayout.propTypes = {
  qaFormData: PropTypes.shape({
    question: PropTypes.shape({
      basics: PropTypes.object.isRequired,
      questionData: PropTypes.object.isRequired,
      answerData: PropTypes.object.isRequired,
    }).isRequired,
    subSubjectId: PropTypes.string,
    subSubjectToMetric: PropTypes.bool,
    subjectName: PropTypes.string,
  }).isRequired,
  allowEditor: PropTypes.bool,
  newQuestionMode: PropTypes.bool,
  editorOpen: PropTypes.bool,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  resetChanges: PropTypes.func,
  handleChangeFunctions: PropTypes.shape({
    handleBasicsChange: PropTypes.func.isRequired,
    handleSubSubjectChange: PropTypes.func.isRequired,
    handleQuestionDataChange: PropTypes.func.isRequired,
    handleAnswerDataChange: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
  onSubmitLoading: PropTypes.bool,
  onSubmitError: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  unsavedChanges: PropTypes.bool,
  newQuestionSubmitted: PropTypes.bool,
};

QuestionCreatorLayout.defaultProps = {
  allowEditor: false,
  newQuestionMode: false,
  editorOpen: false,
  openEditor: null,
  closeEditor: null,
  resetChanges: null,
  handleChangeFunctions: null,
  onSubmit: null,
  onSubmitLoading: null,
  onSubmitError: null,
  unsavedChanges: false,
  newQuestionSubmitted: false,
};

export default QuestionCreatorLayout;
