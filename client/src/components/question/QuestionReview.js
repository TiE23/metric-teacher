import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Container, Button } from "semantic-ui-react";

import QuestionDetailsBasics from "./details/QuestionDetailsBasics";
import QuestionDetailsSubSubject from "./details/QuestionDetailsSubSubject";
import QuestionDetailsQuestion from "./details/QuestionDetailsQuestion";
import QuestionDetailsAnswer from "./details/QuestionDetailsAnswer";

const QuestionReview = (props) => {
  if (!props.qaData) return null;

  return (
    <Grid columns="equal" padded>
      <Grid.Row>
        {/* Quadrant 1 - Basic Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Basic Details</Header>
          <QuestionDetailsBasics qaData={props.qaData} />
        </Grid.Column>
        {/* Quadrant 2 - SubSubject Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>SubSubject Details</Header>
          <QuestionDetailsSubSubject subSubjectId={props.qaData.subSubjectId} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 - Question Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Question Details</Header>
          <QuestionDetailsQuestion
            qaQuestionData={props.qaData.question}
            qaType={props.qaData.question.type}
          />
        </Grid.Column>
        {/* Quadrant 4 - Answer Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Answer Details</Header>
          <QuestionDetailsAnswer
            qaAnswerData={props.qaData.answer}
            qaType={props.qaData.question.type}
          />
        </Grid.Column>
      </Grid.Row>
      {props.allowEditor && props.openEditor &&
      <Grid.Row>
        <Grid.Column>
          <Container textAlign="right">
            <Button
              onClick={props.openEditor}
              primary
            >
              Edit
            </Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
      }
    </Grid>
  );
};

QuestionReview.propTypes = {
  qaData: PropTypes.shape({
    subSubjectId: PropTypes.string.isRequired,
    media: PropTypes.string,
    question: PropTypes.shape({
      type: PropTypes.number.isRequired,
    }).isRequired,
    answer: PropTypes.object.isRequired,
  }),
  allowEditor: PropTypes.bool,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
};

QuestionReview.defaultProps = {
  qaData: null,
  allowEditor: false,
  openEditor: null,
  closeEditor: null,
};

export default QuestionReview;
