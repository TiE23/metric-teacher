import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Grid, Transition } from "semantic-ui-react";

import utils from "../../../utils";

import CarouselPips from "./CarouselPips";

import {
  CAROUSEL_BUTTONS_GRID_COLUMN_WIDTH,
  CAROUSEL_PIPS_GRID_COLUMN_WIDTH,
} from "../../../constants";

class Carousel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      index: utils.minMax(0, this.props.startingIndex, this.props.panels.length - 1),
      nextIndex: null,
      visible: true,
      animation: this.props.incrementInAnimation,
      blocking: false,
    };

    this.changeIndex = (newIndex) => {
      if (newIndex >= 0 && newIndex < this.props.panels.length) {
        this.setState(prevState => ({
          nextIndex: newIndex,
          visible: false,
          animation: newIndex < prevState.index ?
            this.props.decrementOutAnimation : this.props.incrementOutAnimation,
          blocking: true,
        }));
      }
    };

    this.increment = () => {
      if (this.props.wrapping && this.state.index === this.props.panels.length - 1) {
        this.changeIndex(0);  // Go to 0.
      } else {
        this.changeIndex(this.state.index + 1);
      }
    };

    this.decrement = () => {
      if (this.props.wrapping && this.state.index === 0) {
        this.changeIndex(this.props.panels.length - 1); // Go to end.
      } else {
        this.changeIndex(this.state.index - 1);
      }
    };

    this.showNext = () => {
      if (this.state.nextIndex > this.state.index) {
        // Incremented
        this.setState(prevState => ({
          index: prevState.nextIndex,
          visible: true,
          animation: this.props.incrementInAnimation,
        }));
      } else {
        // Decremented
        this.setState(prevState => ({
          index: prevState.nextIndex,
          visible: true,
          animation: this.props.decrementInAnimation,
        }));
      }
    };

    this.unblock = () => {
      this.setState({
        blocking: false,
      });
    };
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row
          style={{ height: "auto" }}
        >
          <Grid.Column
            verticalAlign="bottom"
            onClick={this.props.incrementOnClick ? this.increment : null}
            style={this.props.incrementOnClick ? { cursor: "pointer" } : null}
          >
            <Transition
              unmountOnHide
              visible={this.state.visible}
              duration={{
                hide: this.props.hideAnimationDuration,
                show: this.props.showAnimationDuration,
              }}
              animation={this.state.animation}
              onHide={this.showNext}
              onShow={this.unblock}
            >
              {this.props.panels[this.state.index]}
            </Transition>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row columns={3} verticalAlign="middle">
          <Grid.Column {...CAROUSEL_BUTTONS_GRID_COLUMN_WIDTH}>
            <Button
              icon="angle left"
              floated="right"
              disabled={this.state.blocking || (!this.props.wrapping && this.state.index === 0)}
              onClick={this.decrement}
              color={this.props.controlColor}
            />
          </Grid.Column>

          <Grid.Column {...CAROUSEL_PIPS_GRID_COLUMN_WIDTH} textAlign="center">
            <CarouselPips
              changeIndex={this.changeIndex}
              blocking={this.state.blocking}
              totalPips={this.props.panels.length}
              currentPip={this.state.index}
              color={this.props.controlColor}
            />
          </Grid.Column>

          <Grid.Column {...CAROUSEL_BUTTONS_GRID_COLUMN_WIDTH}>
            <Button
              icon="angle right"
              floated="left"
              disabled={
                this.state.blocking ||
                (!this.props.wrapping && this.state.index === this.props.panels.length - 1)
              }
              onClick={this.increment}
              color={this.props.controlColor}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

Carousel.propTypes = {
  panels: PropTypes.arrayOf(PropTypes.node).isRequired,
  incrementInAnimation: PropTypes.string,
  incrementOutAnimation: PropTypes.string,
  decrementInAnimation: PropTypes.string,
  decrementOutAnimation: PropTypes.string,
  showAnimationDuration: PropTypes.number,
  hideAnimationDuration: PropTypes.number,
  controlColor: PropTypes.string,
  incrementOnClick: PropTypes.bool,
  wrapping: PropTypes.bool,
  startingIndex: PropTypes.number,
};

Carousel.defaultProps = {
  incrementInAnimation: "fade left",
  incrementOutAnimation: "fade right",
  decrementInAnimation: "fade right",
  decrementOutAnimation: "fade left",
  showAnimationDuration: 500,
  hideAnimationDuration: 500,
  controlColor: "grey",
  incrementOnClick: false,
  wrapping: false,
  startingIndex: 0,
};

export default Carousel;
