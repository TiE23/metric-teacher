import React from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import { Sticky } from "semantic-ui-react";
import HeaderMenu from "./HeaderMenu";

const MenuFrame = props => (
  <div>
    <Sticky>
      <HeaderMenu />
    </Sticky>
    <Switch>
      {props.children}
    </Switch>
  </div>
);

MenuFrame.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};

MenuFrame.defaultProps = {
  children: null,
};

export default MenuFrame;
