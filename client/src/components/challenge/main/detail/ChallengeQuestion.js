import React from "react";
import { Icon, Segment } from "semantic-ui-react";

import utils from "../../../../utils";

import QaReviewBasics from "../../../qa/QaReviewBasics";
import DocumentationSubjectModal from "../../../documentation/DocumentationSubjectModal";
import FeedbackCreatorModal from "../../../tools/feedback/FeedbackCreatorModal";

import {
  QA_DATA_EVERYTHING,
} from "../../../../propTypes";

const ChallengeQuestion = props => (
  <Segment>
    <QaReviewBasics
      qaData={props.qaData}
      challengeMode
    />
    <br />
    <div style={{ position: "absolute", bottom: 5, right: 5, textAlign: "right" }}>
      <p style={{ color: "teal", fontSize: "smaller", cursor: "pointer" }}>
        <DocumentationSubjectModal
          subject={props.qaData.subject.name}
          toMetric={props.qaData.subject.toMetric}
        >
          <span style={{ textDecoration: "underline" }}>
            {props.qaData.subject.name}
            {" - "}
            {utils.firstLetterCap(props.qaData.subject.scale)}
            {" - "}
            {props.qaData.subject.toMetric ? "To Metric" : "From Metric"}
            <Icon name="book" />
          </span>
        </DocumentationSubjectModal>
        |
        <FeedbackCreatorModal
          questionId={props.qaData.questionId}
          questionText={
            props.qaData.question.text ||
            utils.qaReviewTextFormatter(props.qaData, true).questionDescription
          }
          questionDifficulty={props.qaData.difficulty}
        >
          <Icon name="paper plane" />
        </FeedbackCreatorModal>
      </p>
    </div>
  </Segment>
);

ChallengeQuestion.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default ChallengeQuestion;
