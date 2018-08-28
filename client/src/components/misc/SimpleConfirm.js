import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Confirm } from "semantic-ui-react";

class SimpleConfirm extends PureComponent {
  constructor(props) {
    super(props);

    // This component transfers the click event and child node's data to the onConfirm and onCancel
    // prop functions using the "event" and "data" states. This cleanly hijacks the onClick event
    // belonging to the child component and transfers it to the OK and Cancel buttons in the confirm
    // pop-up.
    this.state = {
      open: false,
      event: null,
      data: null,
    };

    this.show = (event, data) => this.setState({ open: true, event, data });
    this.close = () => this.setState({ open: false });

    this.handleConfirm = () => {
      if (this.props.onConfirm) {
        this.props.onConfirm(this.state.event, this.state.data);
      }
      this.close();
    };

    this.handleCancel = () => {
      if (this.props.onCancel) {
        this.props.onCancel(this.state.event, this.state.data);
      }
      this.close();
    };
  }

  render() {
    // Pass each child the same show() function that will show the Confirm component on click.
    const childrenWithOnClick = React.Children.map(
      this.props.children,
      child => React.cloneElement(child, { onClick: this.show }),
    );

    return (
      <div>
        {childrenWithOnClick}
        <Confirm
          {...this.props.confirmProps}
          open={this.state.open}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

SimpleConfirm.propTypes = {
  children: PropTypes.node.isRequired,
  confirmProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

SimpleConfirm.defaultProps = {
  confirmProps: null,
  onConfirm: null,
  onCancel: null,
};

export default SimpleConfirm;
