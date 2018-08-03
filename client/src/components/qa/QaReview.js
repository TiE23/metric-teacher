import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../propTypes";

import {
  QUESTION_TYPE_WRITTEN,
} from "../../constants";

import QaReviewBasics from "./QaReviewBasics";
import QaReviewChoices from "./QaReviewChoices";

class QaReview extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      questionEditorOpen: false,
      surveyEditorOpen: false,
    };
  }

  render() {
    const { qaData } = this.props;

    return (
      <div>
        <QaReviewBasics
          qaData={qaData}
        >
          {qaData.question.type === QUESTION_TYPE_WRITTEN &&
            <QaReviewChoices
              choices={qaData.answer.data.multiple.choices}
              choicesOffered={qaData.answer.data.multiple.choicesOffered}
            />
          }
        </QaReviewBasics>
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
