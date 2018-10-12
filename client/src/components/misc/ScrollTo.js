import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ScrollToY from "./ScrollToY";

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
                top: window.scrollY + element.getBoundingClientRect().top - 100,
                inMotion: false,
              });
            },
          );
        }
      } else {
        console.log("None");
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
    if (this.state.mounted && !this.state.inMotion) {
      return (
        <ScrollToY yPos={this.state.top} />
      );
    }

    return null;
  }
}

ScrollTo.propTypes = {
  paramSlug: PropTypes.string,
};

ScrollTo.defaultProps = {
  paramSlug: "",
};

export default ScrollTo;
