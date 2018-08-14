import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Container, Button, Message } from "semantic-ui-react";

import utils from "../../utils";

import QuestionDetailsBasics from "./details/QuestionDetailsBasics";
import QuestionDetailsSubSubject from "./details/QuestionDetailsSubSubject";
import QuestionDetailsQuestion from "./details/QuestionDetailsQuestion";
import QuestionDetailsAnswer from "./details/QuestionDetailsAnswer";
import LoadingButton from "../misc/LoadingButton";

const QuestionViewerLayout = props => (
  // TODO - Consider making PureComponent and splitting up handler funcs before passing to children.
  // TODO - Set loading and error to state and reset error state and re-try.
  <Grid columns="equal" padded>
    <Grid.Row>
      {/* Quadrant 1 - Basic Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>Basic Details</Header>
        <QuestionDetailsBasics
          {...props.qaFormData.question.basics}
          editMode={props.editorOpen}
          handleBasicsChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleBasicsChange}
        />
      </Grid.Column>
      {/* Quadrant 2 - SubSubject Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>SubSubject Details</Header>
        <QuestionDetailsSubSubject
          subSubjectId={props.qaFormData.subSubjectId}
          editMode={props.editorOpen}
          handleSubSubjectIdChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleSubSubjectIdChange}
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
          editMode={props.editorOpen}
          handleQuestionDataChange={props.handleChangeFunctions &&
            props.handleChangeFunctions.handleQuestionDataChange}
        />
      </Grid.Column>
      {/* Quadrant 4 - Answer Details */}
      <Grid.Column>
        <Header size="medium" textAlign="center" dividing>Answer Details</Header>
        <QuestionDetailsAnswer
          type={props.qaFormData.question.basics.type}
          {...props.qaFormData.question.answerData}
          editMode={props.editorOpen}
          handleAnswerDataChange={props.handleChangeFunctions &&
          props.handleChangeFunctions.handleAnswerDataChange}
        />
      </Grid.Column>
    </Grid.Row>
    {props.allowEditor && props.handleChangeFunctions && props.openEditor &&
    <Grid.Row>
      <Grid.Column>
        <Container textAlign="right">
          {props.editorOpen ?
            <span>
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
              <LoadingButton
                onClick={() => {
                  props.onSubmit({
                    variables: utils.composeQaInputFromFormData(props.qaFormData),
                  });
                }}
                loading={props.onSubmitLoading}
                error={props.onSubmitError}
                buttonProps={{
                  primary: true,
                  disabled: !props.unsavedChanges,
                }}
                buttonText="Submit"
                confirmModal
                modalHeaderContent="Submit Changes"
                modalProps={{
                  basic: true,
                  size: "small",
                }}
              />
            </span>
            :
            <Button onClick={props.openEditor} primary >Edit</Button>
          }
        </Container>
      </Grid.Column>
    </Grid.Row>
    }
    {props.onSubmitError &&
    <Grid.Row>
      <Grid.Column>
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{props.onSubmitError.message}</p>
        </Message>
      </Grid.Column>
    </Grid.Row>
    }
  </Grid>
);

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
  resetChanges: PropTypes.func,
  handleChangeFunctions: PropTypes.shape({
    handleBasicsChange: PropTypes.func.isRequired,
    handleSubSubjectIdChange: PropTypes.func.isRequired,
    handleQuestionDataChange: PropTypes.func.isRequired,
    handleAnswerDataChange: PropTypes.func.isRequired,
  }),
  onSubmit: PropTypes.func,
  onSubmitLoading: PropTypes.bool,
  onSubmitError: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  unsavedChanges: PropTypes.bool,
};

QuestionViewerLayout.defaultProps = {
  allowEditor: false,
  editorOpen: false,
  openEditor: null,
  closeEditor: null,
  resetChanges: null,
  handleChangeFunctions: null,
  onSubmit: null,
  onSubmitLoading: null,
  onSubmitError: null,
  unsavedChanges: false,
};

export default QuestionViewerLayout;
