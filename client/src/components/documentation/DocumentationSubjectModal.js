import React from "react";
import PropTypes from "prop-types";
import { Divider, Header, Modal } from "semantic-ui-react";

import Docs from "./DocumentationContent";
import ExternalLink from "../misc/ExternalLink";

const DocumentationSubjectModal = (props) => {
  const subjectAddress = props.subject.toLocaleLowerCase();
  const toMetricAddress = props.toMetric ? "toMetric" : "fromMetric";

  if (!Docs.guide[subjectAddress]) {
    return props.children;
  }

  const targetDoc = Docs.guide[subjectAddress][toMetricAddress];

  return (
    <Modal trigger={props.children} closeIcon>
      <Modal.Header>
        {props.subject}
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Header {...targetDoc.header} />
          {targetDoc.content}
          <Header {...targetDoc.chart.header} />
          {targetDoc.chart.content}
          <Header {...targetDoc.tips.header} />
          {targetDoc.tips.content}
          <Divider />
          <ExternalLink
            to={`/docs/guide/${subjectAddress}/${toMetricAddress.toLocaleLowerCase()}`}
          >
            See full documentation...
          </ExternalLink>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

DocumentationSubjectModal.propTypes = {
  children: PropTypes.node.isRequired,
  subject: PropTypes.string.isRequired,
  toMetric: PropTypes.bool.isRequired,
};

export default DocumentationSubjectModal;
