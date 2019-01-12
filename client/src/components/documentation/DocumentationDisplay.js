import React from "react";
import PropTypes from "prop-types";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import forEach from "lodash/forEach";
import isPlainObject from "lodash/isPlainObject";

/**
 * This function recursively constructs the individual elements of the document page.
 * It returns two arrays: nodes and keys. Nodes are the actual React node objects while the
 * keys are unique IDs that differentiate every element so that we can satisfy the React requirement
 * of having unique keys for the final list in the output Container component.
 *
 * It essentially loops through the Docs object tracking the "address" of every leaf value with a
 * recursively filled array. That address array is used to intelligently name the elements.
 * Ex: The object Docs.intro.findHelp.header is automatically ID'd as "intro-findhelp".
 *
 * @param docs
 * @param target
 * @param address
 * @returns {{nodes: Array, keys: Array}}
 */
const docExploder = (docs, target = [], address = []) => {
  const nodes = [];
  const keys = [];

  forEach(docs, (doc, key) => {
    const id = address.join("-");
    const currentTarget = target.slice(0, 1)[0];

    if (
      target.length === 0 ||
      (currentTarget && currentTarget.toLocaleLowerCase() === key.toLocaleLowerCase())
    ) {
      if (key === "header") {
        nodes.push((
          <React.Fragment key={`${id}-header`}>
            <Link
              to={`/docs/${address.join("/")}`}
              id={id}
              replace
            >
              <Header {...doc} />
            </Link>
            <br />
          </React.Fragment>
        ));
        keys.push(id);
      } else if (React.isValidElement(doc) && key === "content") {
        nodes.push((
          <React.Fragment key={`${id}-content`}>
            {doc}
            <br />
          </React.Fragment>
        ));
        keys.push(id);
      } else if (isPlainObject(doc) && !React.isValidElement(doc)) {
        // Recursive call
        const explodeFurther =
          docExploder(doc, target.slice(1), address.concat(key.toLocaleLowerCase()));

        nodes.push(explodeFurther.nodes);
        keys.push(explodeFurther.keys);
      }
    }

  });

  return { nodes, keys };
};


/**
 * This takes the results from the recursive function docExploder() and creates an array of simple
 * { node, id } objects to later be used in a map in the render function below.
 * @param docs
 * @param target
 * @returns {Array}
 */
const explodeDocs = (docs, target) => {
  const { nodes, keys } = docExploder(docs, target);
  const docsArray = [];

  for (let index = 0; index < nodes.length && index < keys.length; ++index) {
    docsArray.push({
      node: nodes[index],
      id: keys[index],
    });
  }

  return docsArray;
};

const DocumentationDisplay = (props) => {
  const { documents, sectionTarget } = props;

  return explodeDocs(documents, sectionTarget).map(
    ({ node, id }) => <React.Fragment key={id}>{node}</React.Fragment>,
  );
};

DocumentationDisplay.propTypes = {
  documents: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  sectionTarget: PropTypes.string,
};

DocumentationDisplay.defaultProps = {
  sectionTarget: "all",
};

export default DocumentationDisplay;
