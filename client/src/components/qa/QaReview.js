import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  QUESTION_TYPE_WRITTEN,
  QUESTION_TYPE_SURVEY,
} from "../../constants";

import QaReviewBasics from "./QaReviewBasics";
import QaReviewChoices from "./QaReviewChoices";
import QaReviewSurvey from "./QaReviewSurvey";

class QaReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionEditorOpen: false,
      surveyEditorOpen: false,
    };

    this.openSurveyEditor = () => {
      this.setState({ surveyEditorOpen: true });
    };

    this.closeSurveyEditor = () => {
      this.setState({ surveyEditorOpen: false });
    };
  }

  render() {
    if (!this.props.qaData) return null;

    const { qaData } = this.props;

    return (
      <QaReviewBasics qaData={qaData}>
        {qaData.question.type === QUESTION_TYPE_WRITTEN &&
          <QaReviewChoices
            choices={qaData.answer.data.multiple.choices}
            choicesOffered={qaData.answer.data.multiple.choicesOffered}
          />
        }
        {qaData.question.type === QUESTION_TYPE_SURVEY && qaData.question.data.survey.response &&
          <QaReviewSurvey
            surveyResponseData={qaData.question.data.survey.response}
            surveyEditorOpen={this.props.allowSurveyEditor ? this.state.surveyEditorOpen : false}
            openSurveyEditor={this.props.allowSurveyEditor ? this.openSurveyEditor : null}
            closeSurveyEditor={this.props.allowSurveyEditor ? this.closeSurveyEditor : null}
          />
        }
      </QaReviewBasics>
    );
  }
}

QaReview.propTypes = {
  qaData: QA_DATA_EVERYTHING,
  allowQuestionEditor: PropTypes.bool,
  allowSurveyEditor: PropTypes.bool,
};

QaReview.defaultProps = {
  qaData: null,
  allowQuestionEditor: false,
  allowSurveyEditor: false,
};

export default QaReview;
