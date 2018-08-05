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

const QaReviewSurveyEditor = (props) => {
  return (
    <Mutation
      mutation={SURVEY_ADD_ANSWER_MUTATION}
      update={(cache, { data: { addSurveyAnswer } }) => {
        const data = cache.readQuery(props.queryInfo);
        const newData = {
          score: addSurveyAnswer.score,
          detail: addSurveyAnswer.detail,
          answer: { value: addSurveyAnswer.value },
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
          surveyData={props.surveyData}
          questionFlags={props.questionFlags}
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
};

QaReviewSurveyEditor.propTypes = {
  surveyData: QA_DATA_QUESTION_SURVEY.isRequired,
  queryInfo: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
  questionFlags: PropTypes.number.isRequired,
};

export default QaReviewSurveyEditor;
