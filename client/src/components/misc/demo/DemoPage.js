import React from "react";
import PropTypes from "prop-types";

const DemoPage = props => (
  <p>Demo Page! <br /> {props.foo}</p>
);

DemoPage.propTypes = {
  foo: PropTypes.string,
};

DemoPage.defaultProps = {
  foo: "Hello!",
};

export default DemoPage;
