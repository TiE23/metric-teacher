import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import QuestionReviewDetails from "./review/QuestionReviewDetails";

class QuestionView extends PureComponent {
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
      <QuestionReviewDetails qaData={this.props.qaData} />
    );
  }
}

QuestionView.propTypes = {
  qaData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  allowQuestionEditor: PropTypes.bool,
};

QuestionView.defaultProps = {
  qaData: null,
  allowQuestionEditor: false,
};

export default QuestionView;
