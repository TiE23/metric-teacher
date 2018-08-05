import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../utils";

import QaReviewSurveyEditorForm from "./QaReviewSurveyEditorForm";

import {
  SURVEY_ADD_ANSWER_MUTATION,
} from "../../graphql/Mutations";

import {
  QA_RANGE_OBJECT_TYPE,
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
          surveyRangeData={props.surveyRangeData}
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
  surveyData: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  surveyRangeData: QA_RANGE_OBJECT_TYPE.isRequired,
  queryInfo: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default QaReviewSurveyEditor;
