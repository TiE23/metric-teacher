import React from "react";
import PropTypes from "prop-types";

const UserDetailSurvey = (props) => {
  const { survey } = props;
  return (
    <li>SurveyId: {survey.id} - Question: {survey.question.question} - Answer: {survey.answer} - Score: {survey.score} - Status: {survey.status}</li>
  );
};

UserDetailSurvey.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    question: PropTypes.shape({
      question: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserDetailSurvey;
