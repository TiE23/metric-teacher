import { PureComponent } from "react";

class ScrollToTopOnMount extends PureComponent {
  constructor(props) {
    super(props);

    this.componentDidMount = () => {
      window.scrollTo(0, 0);
    };
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMount;
