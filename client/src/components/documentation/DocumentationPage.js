import React from "react";
import PropTypes from "prop-types";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import forEach from "lodash/forEach";
import isPlainObject from "lodash/isPlainObject";

import Docs from "./DocumentationContent";
import ScrollTo from "../misc/ScrollTo";

const docExploder = (docs, address = []) => {
  const nodes = [];
  const ids = [];

  forEach(docs, (doc, key) => {
    const id = address.join("-");

    if (isPlainObject(doc) && !React.isValidElement(doc)) {
      // Recursive call
      const explodeFurther = docExploder(doc, address.concat(key.toLocaleLowerCase()));

      nodes.push(explodeFurther.nodes);
      ids.push(explodeFurther.ids);
    } else if (React.isValidElement(doc) && key === "header") {
      nodes.push((
        <React.Fragment key={`${id}-header`}>
          <Link
            to={`/docs/${address.join("/")}`}
            id={id}
            replace
          >
            {doc}
          </Link>
          <br />
        </React.Fragment>
      ));
      ids.push(id);
    } else if (React.isValidElement(doc) && key === "content") {
      nodes.push((
        <React.Fragment key={`${id}-content`}>
          {doc}
          {doc && <br />}
        </React.Fragment>
      ));
      ids.push(id);
    }

  });

  return { nodes, ids };
};

const explodeDocs = (docs) => {
  const { nodes, ids } = docExploder(docs);
  const docsArray = [];

  for (let index = 0; index < nodes.length && index < ids.length; ++index) {
    docsArray.push({
      node: nodes[index],
      id: ids[index],
    });
  }

  return docsArray;
};

const DocumentationPage = props => (
  <div id="top">
    <ScrollTo paramSlug={props.match.params[0].slice(1)} />
    <Container>
      {explodeDocs(Docs).map(({ node, id }) => <div key={id}>{node}</div>)}
    </Container>
  </div>
);

DocumentationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      0: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default withRouter(DocumentationPage);
