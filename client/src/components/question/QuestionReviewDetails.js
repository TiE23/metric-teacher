import React from "react";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import QuestionReviewDetailsBasics from "./QuestionReviewDetailsBasics";
import QuestionReviewDetailsSubSubject from "./QuestionReviewDetailsSubSubject";

const QuestionReviewDetails = (props) => {
  if (!props.qaData) return null;

  return (
    <Grid columns="equal" celled="internally">
      <Grid.Row>
        {/* Quadrant 1 Basics */}
        <Grid.Column>
          <QuestionReviewDetailsBasics qaData={props.qaData} />
        </Grid.Column>
        {/* Quadrant 2 SubSubject */}
        <Grid.Column>
          <QuestionReviewDetailsSubSubject subSubjectId={props.qaData.subSubjectId} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* Quadrant 3 */}
        <Grid.Column>
          <p>3</p>
        </Grid.Column>
        {/* Quadrant 4 */}
        <Grid.Column>
          <p>4</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

QuestionReviewDetails.propTypes = {
  qaData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

QuestionReviewDetails.defaultProps = {
  qaData: null,
};

export default QuestionReviewDetails;
