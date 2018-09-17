import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dimmer, Grid, Header, Icon, Segment, Transition } from "semantic-ui-react";
import deline from "deline";

import utils from "../../../utils";

import ChallengeDetail from "./detail/ChallengeDetail";
import ChallengeResponse from "./response/ChallengeResponse";

import {
  CHALLENGE_DIMMER_TIME,
  CHALLENGE_DIMMER_TRANSITION_PROPS,
  CHALLENGE_MAX_STRIKES,
  CHALLENGE_QUESTION_REPEAT,
  CHALLENGE_RESOLUTION_SKIP,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
  CHALLENGE_RESOLUTION_SURVEY_ANSWER,
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
      dimmerColor: "blue",
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
        dimmerColor: "orange",
        dimmerMessage: "Skipped!",
        dimmerIcon: "trash alternate outline",
      });

      dimmerStart(() => this.props.resolveCurrentQA(
        this.props.qaData.id, CHALLENGE_RESOLUTION_SKIP,
      ));
    };

    this.handleResolveQa = (resolution, payload = null) => {
      const { currentQaProgress, qaData } = this.props;

      let dimmerColor;
      let dimmerMessage;
      let dimmerIcon;

      if (resolution === CHALLENGE_RESOLUTION_CORRECT) {
        const repeats =
          CHALLENGE_QUESTION_REPEAT[qaData.question.type][qaData.difficulty];
        dimmerColor = "olive";
        dimmerMessage = repeats > 1 ? deline`
          ${currentQaProgress.correctAnswerCount + 1 >= repeats ? "Success!" : "Correct!"}
          ${currentQaProgress.correctAnswerCount + 1} / ${repeats}
        ` : "Correct!";
        dimmerIcon = "check";
      } else if (resolution === CHALLENGE_RESOLUTION_INCORRECT) {
        const strikes =
          CHALLENGE_MAX_STRIKES[qaData.question.type][qaData.difficulty];
        dimmerColor = "red";
        dimmerMessage = strikes > 1 ? deline`
          ${currentQaProgress.incorrectAnswerCount + 1 >= strikes ? "Failed!" : "Incorrect!"}
          ${currentQaProgress.incorrectAnswerCount + 1} / ${strikes}
        ` : "Incorrect!";
        dimmerIcon = "remove";
      } else if (resolution === CHALLENGE_RESOLUTION_SURVEY_ANSWER) {
        dimmerColor = "blue";
        dimmerMessage = "Survey Response Received!";
        dimmerIcon = "clipboard check";
      }

      this.setState({
        dimmerColor,
        dimmerMessage,
        dimmerIcon,
      });

      dimmerStart(() => props.resolveCurrentQA(props.qaData.id, resolution, payload));
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
                resolveQa={this.handleResolveQa}
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
          <Transition
            visible={this.state.dimmed}
            {...CHALLENGE_DIMMER_TRANSITION_PROPS}
          >
            <Header size="large" icon color={this.state.dimmerColor}>
              <Icon name={this.state.dimmerIcon} />
              {this.state.dimmerMessage}
            </Header>
          </Transition>
        </Dimmer>

      </Dimmer.Dimmable>
    );
  }
};

ChallengeMain.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQaProgress: PropTypes.shape({
    correctAnswerCount: PropTypes.number.isRequired,
    incorrectAnswerCount: PropTypes.number.isRequired,
  }).isRequired,
  currentChallenge: PropTypes.shape({
    answerData: PropTypes.any,
  }).isRequired,
  streak: PropTypes.number.isRequired,  // This is behind by +1 or -1 so adjustments will be needed
  resolveCurrentQA: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeMain;
