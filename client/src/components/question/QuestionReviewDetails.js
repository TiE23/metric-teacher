import React from "react";
import PropTypes from "prop-types";
import { Grid, Header, Segment } from "semantic-ui-react";

import QuestionReviewDetailsBasics from "./QuestionReviewDetailsBasics";
import QuestionReviewDetailsSubSubject from "./QuestionReviewDetailsSubSubject";
import QuestionReviewDetailsQuestion from "./QuestionReviewDetailsQuestion";
import QuestionReviewDetailsAnswer from "./QuestionReviewDetailsAnswer";

const QuestionReviewDetails = (props) => {
  if (!props.qaData) return null;

  return (
    <Grid columns="equal" padded>
      <Grid.Row>
        {/* Quadrant 1 - Basic Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" attached="top">Basic Details</Header>
          <Segment attached>
            <QuestionReviewDetailsBasics qaData={props.qaData} />
          </Segment>
        </Grid.Column>
        {/* Quadrant 2 - SubSubject Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" attached="top">SubSubject Details</Header>
          <Segment attached>
            <QuestionReviewDetailsSubSubject subSubjectId={props.qaData.subSubjectId} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 - Question Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" attached="top">Question Details</Header>
          <Segment attached>
            <QuestionReviewDetailsQuestion
              qaQuestionData={props.qaData.question}
              qaType={props.qaData.question.type}
            />
          </Segment>
        </Grid.Column>
        {/* Quadrant 4 - Answer Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" attached="top">Answer Details</Header>
          <Segment attached>
            <QuestionReviewDetailsAnswer
              qaAnswerData={props.qaData.answer}
              qaType={props.qaData.question.type}
            />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Media Section? */}
        <Grid.Column>
          <p>Media?</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

QuestionReviewDetails.propTypes = {
  qaData: PropTypes.shape({
    subSubjectId: PropTypes.string.isRequired,
    question: PropTypes.shape({
      type: PropTypes.number.isRequired,
    }).isRequired,
    answer: PropTypes.object.isRequired,
  }),
};

QuestionReviewDetails.defaultProps = {
  qaData: null,
};

export default QuestionReviewDetails;
