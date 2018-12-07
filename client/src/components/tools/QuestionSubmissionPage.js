import React from "react";

import QuestionViewer from "../question/QuestionViewer";

const QuestionSubmissionPage = () => (
  <QuestionViewer
    allowEditor
    newQuestionMode
  />
);

QuestionSubmissionPage.propTypes = {

};

export default QuestionSubmissionPage;
