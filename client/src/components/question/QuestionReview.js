import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import QuestionReviewDetails from "./QuestionReviewDetails";

class QuestionReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionEditorOpen: false,
    };

    this.openQuestionEditor = () => {
      this.setState({ questionEditorOpen: true });
    };

    this.closeQuestionEditor = () => {
      this.setState({ questionEditorOpen: false });
    };
  }

  render() {
    if (!this.props.qaData) return null;

    return (
      <QuestionReviewDetails
        qaData={this.props.qaData}
      />
    );
  }
}

QuestionReview.propTypes = {
  qaData: PropTypes.object,
  allowQuestionEditor: PropTypes.bool,
};

QuestionReview.defaultProps = {
  qaData: null,
  allowQuestionEditor: false,
};

export default QuestionReview;
