import React from "react";
import { Icon, Segment } from "semantic-ui-react";

import utils from "../../../../utils";

import QaReviewBasics from "../../../qa/QaReviewBasics";
import DocumentationSubjectModal from "../../../documentation/DocumentationSubjectModal";

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
      <DocumentationSubjectModal
        subject={props.qaData.subject.name}
        toMetric={props.qaData.subject.toMetric}
      >
        <p
          style={{
            color: "teal",
            fontSize: "smaller",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {props.qaData.subject.name}
          {" - "}
          {utils.firstLetterCap(props.qaData.subject.scale)}
          {" - "}
          {props.qaData.subject.toMetric ? "To Metric" : "From Metric"}
          <Icon name="book" />
        </p>
      </DocumentationSubjectModal>
    </div>
  </Segment>
);

ChallengeQuestion.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
};

export default ChallengeQuestion;
