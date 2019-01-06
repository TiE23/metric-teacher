import React from "react";
import PropTypes from "prop-types";
import { Divider, Header, Modal } from "semantic-ui-react";

import Docs from "./DocumentationContent";
import XLink from "../misc/ExternalLink";

const DocumentationSubjectModal = (props) => {
  const subjectAddress = props.subject.toLocaleLowerCase();
  const directionAddress = props.toMetric ? "toMetric" : "fromMetric";

  if (!Docs.guide[subjectAddress]) {
    return props.children;
  }

  const targetDoc = Docs.guide[subjectAddress][directionAddress];

  return (
    <Modal trigger={props.children} closeIcon>
      <Modal.Header>
        {props.subject}
      </Modal.Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Header {...targetDoc.header} />
          {targetDoc.content}
          <Header {...targetDoc.tips.header} />
          {targetDoc.tips.content}
          <Header {...targetDoc.chart.header} />
          {targetDoc.chart.content}
          <Divider />
          <XLink
            to={`/docs/guide/${subjectAddress}/${directionAddress.toLocaleLowerCase()}`}
          >
            See full documentation...
          </XLink>
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
