import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import QuestionReviewDetailsBasics from "./QuestionReviewDetailsBasics";
import QuestionReviewDetailsSubSubject from "./QuestionReviewDetailsSubSubject";
import QuestionReviewDetailsQuestion from "./QuestionReviewDetailsQuestion";
import QuestionReviewDetailsAnswer from "./QuestionReviewDetailsAnswer";

const QuestionReviewDetails = (props) => {
  if (!props.qaData) return null;

  return (
    <Grid columns="equal" celled="internally">
      <Grid.Row>
        {/* Quadrant 1 - Basic Details */}
        <Grid.Column>
          <QuestionReviewDetailsBasics qaData={props.qaData} />
        </Grid.Column>
        {/* Quadrant 2 - SubSubject Details */}
        <Grid.Column>
          <QuestionReviewDetailsSubSubject subSubjectId={props.qaData.subSubjectId} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 - Question Details */}
        <Grid.Column>
          <QuestionReviewDetailsQuestion
            qaQuestionData={props.qaData.question}
            qaType={props.qaData.question.type}
          />
        </Grid.Column>
        {/* Quadrant 4 - Answer Details */}
        <Grid.Column>
          <QuestionReviewDetailsAnswer
            qaAnswerData={props.qaData.answer}
            qaType={props.qaData.question.type}
          />
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
