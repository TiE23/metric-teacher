import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import QaReviewBasics from "./QaReviewBasics";

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
        <QaReviewBasics qaData={this.props.qaData} />
      </div>
    );
  }
}

QaReview.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  allowQuestionEditor: PropTypes.bool,
  allowSurveyEditor: PropTypes.bool,
};

QaReview.defaultProps = {
  allowQuestionEditor: false,
  allowSurveyEditor: false,
};

export default QaReview;
