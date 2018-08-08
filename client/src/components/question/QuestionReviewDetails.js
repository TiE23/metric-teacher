import React from "react";
import PropTypes from "prop-types";
import { Grid, Header } from "semantic-ui-react";

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
          <Header size="medium" textAlign="center" dividing>Basic Details</Header>
          <QuestionReviewDetailsBasics qaData={props.qaData} />
        </Grid.Column>
        {/* Quadrant 2 - SubSubject Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>SubSubject Details</Header>
          <QuestionReviewDetailsSubSubject subSubjectId={props.qaData.subSubjectId} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 - Question Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Question Details</Header>
          <QuestionReviewDetailsQuestion
            qaQuestionData={props.qaData.question}
            qaType={props.qaData.question.type}
          />
        </Grid.Column>
        {/* Quadrant 4 - Answer Details */}
        <Grid.Column>
          <Header size="medium" textAlign="center" dividing>Answer Details</Header>
          <QuestionReviewDetailsAnswer
            qaAnswerData={props.qaData.answer}
            qaType={props.qaData.question.type}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

QuestionReviewDetails.propTypes = {
  qaData: PropTypes.shape({
    subSubjectId: PropTypes.string.isRequired,
    media: PropTypes.string,
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
