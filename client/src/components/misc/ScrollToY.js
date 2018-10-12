import { PureComponent } from "react";
import PropTypes from "prop-types";

class ScrollToY extends PureComponent {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      this.scroll();
    };

    this.componentDidUpdate = (prevProps) => {
      if (prevProps.yPos !== this.props.yPos) {
        this.scroll();
      }
    };

    this.scroll = () => {
      window.scrollTo(0, this.props.yPos);
    };
  }

  render() {
    return null;
  }
}

ScrollToY.propTypes = {
  yPos: PropTypes.number,
};

export default ScrollToY;
