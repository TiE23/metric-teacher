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
 * Later on I added routeRoot and target...
 *
 * I'll explain target first. On the DocumentationPage I added an indicator in the route parameters,
 * to prefix auto-scroll links to each header on the page. For example, /docs/all/guide will
 * auto-scroll the entire docs file down to the "Conversion Guides" part of the docs. But have the
 * link /docs/1/guide, it'll show ONLY the "Conversion Guides" part of the docs and all its
 * children. If you put /docs/1/guide/mass, it'll scroll down to the "Mass" section, showing all the
 * "Conversion Guides" section and nothing else. But finally, if you put /docs/2/guide/mass it'll
 * show ONLY the "Mass" section. The number indicates the layers we want to dive. In that example,
 * /docs/1/guide/mass, the target param will be ["guide"]. docExploder will only add content to the
 * return value when it finds the "guide" header, and all children below it. In the example
 * /docs/2/guide/mass, the target param will be ["guide", "mass"]. docExploder will only add content
 * to the return value when it finds "guide" AND THEN "mass". Pretty cool huh?
 *
 * routeRoot is that "/1/" or "/2/" or "/all/" part of the route parameters so that scroll links
 * match what is set. Pretty neat, huh?
 *
 * @param docs
 * @param routeRoot
 * @param target
 * @param address
 * @returns {{ nodes: Array, keys: Array }}
 */
const docExploder = (docs, routeRoot, target = [], address = []) => {
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
              to={
                `/docs/${routeRoot && routeRoot !== address[0] ?  // Incase no routeRoot defined.
                  `${routeRoot}/` : ""}${address.join("/")}`
              }
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
          docExploder(doc, routeRoot, target.slice(1), address.concat(key.toLocaleLowerCase()));

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
 * @param routeRoot
 * @param target
 * @returns {Array}
 */
const explodeDocs = (docs, routeRoot, target) => {
  const { nodes, keys } = docExploder(docs, routeRoot, target);
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
  const { documents, routeRoot, sectionTarget } = props;

  return explodeDocs(documents, routeRoot, sectionTarget).map(
    ({ node, id }) => <React.Fragment key={id}>{node}</React.Fragment>,
  );
};

DocumentationDisplay.propTypes = {
  documents: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  routeRoot: PropTypes.string,
  sectionTarget: PropTypes.arrayOf(PropTypes.string),
};

DocumentationDisplay.defaultProps = {
  routeRoot: null,
  sectionTarget: [],
};

export default DocumentationDisplay;
