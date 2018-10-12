/* eslint-disable no-undef */
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

import ScrollToY from "./ScrollToY";

import {
  DOCUMENTATION_HEADER_OFFSET,
} from "../../constants";

class ScrollTo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      top: 0,
      mounted: false,
      inMotion: false,
    };

    this.scroll = () => {
      if (this.props.paramSlug) {
        const id = this.props.paramSlug.replace(/\//g, "-").toLocaleLowerCase();
        const element = document.getElementById(id);

        if (element) {
          this.setState(
            {
              top: window.scrollY,
              inMotion: true,
            },
            () => {
              this.setState({
                top: window.scrollY + element.getBoundingClientRect().top +
                  DOCUMENTATION_HEADER_OFFSET,
                inMotion: false,
              });
            },
          );
        }
      } else {
        this.setState(
          {
            top: 0,
            inMotion: true,
          },
          () => {
            this.setState({
              top: window.scrollY,
              inMotion: false,
            });
          },
        );
      }
    };

    this.componentDidMount = () => {
      const top = window.scrollY;

      this.setState({ top }, () => {
        // If the page is restored, update the scroll position.
        if (top === 0) {
          this.scroll();
        }

        this.setState({
          mounted: true,
        });
      });
    };

    this.componentDidUpdate = (prevProps) => {
      if (prevProps.paramSlug !== this.props.paramSlug) {
        this.scroll();
      }
    };
  }

  render() {
    const { mounted, inMotion, top } = this.state;
    const yPos = !mounted || inMotion ? top : spring(top);

    return (
      <Motion style={{ y: yPos }}>
        {springValue => (
          <ScrollToY yPos={Math.round(springValue.y)} />
        )}
      </Motion>
    );
  }
}

ScrollTo.propTypes = {
  paramSlug: PropTypes.string,
};

ScrollTo.defaultProps = {
  paramSlug: "",
};

export default ScrollTo;
