import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Segment, Progress } from "semantic-ui-react";

class QaReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionEditorOpen: false,
      surveyEditorOpen: false,
    };
  }

  render() {
    return (
      <div>
        <p>QaReview</p>
        <p>qid: {this.props.qaData.questionId}</p>
        <p>ssid: {this.props.qaData.subSubjectId}</p>
        <p>
          editQ? {this.props.allowQuestionEditor ? "yes" : "no"},
          editS? {this.props.allowSurveyEditor ? "yes" : "no"}
        </p>
      </div>
    );
  }
}

QaReview.propTypes = {
  qaData: PropTypes.shape({
    questionId: PropTypes.string.isRequired,
    subSubjectId: PropTypes.string.isRequired,
    difficulty: PropTypes.number.isRequired,
    flags: PropTypes.number.isRequired,
    media: PropTypes.string,
  }).isRequired,
  allowQuestionEditor: PropTypes.bool,
  allowSurveyEditor: PropTypes.bool,
};

QaReview.defaultProps = {
  allowQuestionEditor: false,
  allowSurveyEditor: false,
};

export default QaReview;
