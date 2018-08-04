import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import QaReviewSurveyEditorForm from "./QaReviewSurveyEditorForm";

import {
  SURVEY_ADD_ANSWER_MUTATION,
} from "../../graphql/Mutations";

const QaReviewSurveyEditor = (props) => {
  return (
    <Mutation
      mutation={SURVEY_ADD_ANSWER_MUTATION}
      update={(cache, { data: { addSurveyAnswer } }) => {
        const data = cache.readQuery(props.queryInfo);
        // TODO - Update cache.
      }}
    >
      {(addSurveyAnswers, { loading, error }) => (
        <QaReviewSurveyEditorForm
          surveyData={props.surveyData}
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
  queryInfo: PropTypes.object.isRequired,   // eslint-disable-line react/forbid-prop-types
  studentId: PropTypes.string.isRequired,
  questionId: PropTypes.string.isRequired,
};

export default QaReviewSurveyEditor;
