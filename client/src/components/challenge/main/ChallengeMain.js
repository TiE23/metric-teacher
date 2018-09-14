import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dimmer, Grid, Segment, Header, Icon } from "semantic-ui-react";

import utils from "../../../utils";

import ChallengeDetail from "./detail/ChallengeDetail";
import ChallengeResponse from "./response/ChallengeResponse";

import {
  CHALLENGE_DIMMER_TIME,
} from "../../../constants";

import {
  QA_DATA_EVERYTHING,
} from "../../../propTypes";

const ChallengeMain = class ChallengeMain extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dimmed: false,
      dimmerEndFunction: null,
      dimmerMessage: "Done",
      dimmerIcon: "check",  // TODO - Replace with an image
    };

    const dimmerStart = (dimmerEndFunction) => {
      showDimmer();
      this.setState({ dimmerEndFunction });
      this.interval = setInterval(this.dimmerEnd, CHALLENGE_DIMMER_TIME);
    };

    this.dimmerEnd = () => {
      clearInterval(this.interval);
      this.hideDimmer();
      if (this.state.dimmerEndFunction) {
        this.state.dimmerEndFunction();
        this.setState({ dimmerEndFunction: null });
      }
    };

    const showDimmer = () => {
      this.setState({ dimmed: true });
    };

    this.hideDimmer = () => {
      this.setState({ dimmed: false });
    };

    this.handleSkipQa = () => {
      this.setState({
        dimmerMessage: "Skipped!",
        dimmerIcon: "trash alternate outline",
      });
      dimmerStart(() => this.props.resolveCurrentQA(this.props.qaData.id, "skip"));
    };

    this.handleClearQa = () => this.props.updateCurrentChallengeData({ answerData: null });
  }

  render() {
    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmed}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ChallengeDetail
                qaData={this.props.qaData}
                showClearButton={
                  !!(this.props.currentChallenge.answerData &&
                    utils.t0(this.props.currentChallenge.answerData.selectedAnswer))
                }
                handleSkipQa={this.handleSkipQa}
                handleClearQa={this.handleClearQa}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ChallengeResponse
                qaData={this.props.qaData}
                currentChallenge={this.props.currentChallenge}
                challengeCompletion={this.props.challengeCompletion}
                resolveCurrentQA={this.props.resolveCurrentQA}
                updateCurrentChallengeData={this.props.updateCurrentChallengeData}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Dimmer
          active={this.state.dimmed}
          onClickOutside={this.dimmerEnd}
          inverted
        >
          <Header size="large" icon color="blue">
            <Icon name={this.state.dimmerIcon} />
            {this.state.dimmerMessage}
          </Header>
        </Dimmer>

      </Dimmer.Dimmable>
    );
  }
};

ChallengeMain.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQaProgress: PropTypes.shape({
    seen: PropTypes.bool.isRequired,
    skipped: PropTypes.bool.isRequired,
    succeeded: PropTypes.bool.isRequired,
    failed: PropTypes.bool.isRequired,
    incorrectAnswerCount: PropTypes.number.isRequired,
  }).isRequired,
  currentChallenge: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  resolveCurrentQA: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeMain;
