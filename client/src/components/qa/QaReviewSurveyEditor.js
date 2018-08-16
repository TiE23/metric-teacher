import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../utils";

import QaReviewSurveyEditorForm from "./QaReviewSurveyEditorForm";

import {
  SURVEY_ADD_ANSWER_MUTATION,
} from "../../graphql/Mutations";

import {
  QA_DATA_QUESTION_SURVEY,
} from "../../propTypes";

const QaReviewSurveyEditor = props => (
  <Mutation
    mutation={SURVEY_ADD_ANSWER_MUTATION}
    update={(cache, { data: { addSurveyAnswer } }) => {
      const data = cache.readQuery(props.queryInfo);
      const newData = {
        score: addSurveyAnswer.score,
        detail: addSurveyAnswer.detail,
        answer: { value: parseFloat(addSurveyAnswer.answer.match(/[.0-9]+/)[0]) },
      };
      utils.cacheUpdateObject(data, addSurveyAnswer.id, newData, [], "surveyId");
      cache.writeQuery({
        ...props.queryInfo,
        data,
      });
    }}
  >
    {(addSurveyAnswers, { loading, error }) => (
      <QaReviewSurveyEditorForm
        answer={props.surveyData.response.answer.value}
        unit={props.surveyData.response.answer.unit}
        note={props.surveyData.response.detail}
        top={props.surveyData.range.top.value}
        bottom={props.surveyData.range.bottom.value}
        step={props.surveyData.step}
        score={props.surveyData.response.score}
        questionFlags={props.questionFlags}
        closeSurveyEditor={props.closeSurveyEditor}
        onSubmit={answerInputVariables => addSurveyAnswers({
          variables: {
            studentid: props.studentId,
            answerinput: {
              questionid: props.questionId,
              ...answerInputVariables,
            },
          },
        })}
        loading={loading}
        error={error}
      />
    )}
  </Mutation>
);

QaReviewSurveyEditor.propTypes = {
  surveyData: QA_DATA_QUESTION_SURVEY.isRequired,
  queryInfo: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  questionFlags: PropTypes.number.isRequired,
  closeSurveyEditor: PropTypes.func,
};

QaReviewSurveyEditor.defaultProps = {
  closeSurveyEditor: null,
};

export default QaReviewSurveyEditor;
