import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

class ResponsivePlayer extends PureComponent {
  render() {
    return (
      <div
        style={{
          position: "relative",
          paddingTop: `${100 / (this.props.xyRatio)}%`,
          ...this.props.playerStyle,
        }}
      >
        <ReactPlayer
          style={{ position: "absolute", top: 0, left: 0 }}
          width="100%"
          height="100%"
          {...this.props.player}
        />
      </div>
    );
  }
}

ResponsivePlayer.propTypes = {
  xyRatio: PropTypes.number,
  player: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  playerStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ResponsivePlayer.defaultProps = {
  xyRatio: 1,
  playerStyle: { borderStyle: "ridge" },  // Disable by passing {} (an empty object)
};

export default ResponsivePlayer;
