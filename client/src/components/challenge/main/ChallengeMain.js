import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dimmer, Grid, Header, Icon, Segment, Transition } from "semantic-ui-react";
import deline from "deline";

import utils from "../../../utils";

import ChallengeDetail from "./detail/ChallengeDetail";
import ChallengeResponse from "./response/ChallengeResponse";

import {
  CHALLENGE_DIMMER_TIME_NO_EXTRA,
  CHALLENGE_DIMMER_TIME_EXTRA,
  CHALLENGE_DIMMER_TRANSITION_PROPS,
  CHALLENGE_MAX_STRIKES,
  CHALLENGE_QUESTION_REPEAT,
  CHALLENGE_RESOLUTION_SKIP,
  CHALLENGE_RESOLUTION_CORRECT,
  CHALLENGE_RESOLUTION_INCORRECT,
  CHALLENGE_RESOLUTION_SURVEY_FILLED,
  CHALLENGE_RESPONSE_INPUT_DIRECT,
  CHALLENGE_RESPONSE_INPUT_SLIDER,
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
      dimmerExtra: null,
      dimmerIcon: "check",  // TODO - Replace with an image
    };

    const dimmerStart = (dimmerEndFunction, dimmerTime) => {
      showDimmer();
      this.setState({ dimmerEndFunction });
      this.interval = setInterval(this.dimmerEnd, dimmerTime);
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

      dimmerStart(
        () => this.props.resolveQa(this.props.qaData.id, CHALLENGE_RESOLUTION_SKIP),
        CHALLENGE_DIMMER_TIME_NO_EXTRA,
      );
    };


    /**
     * Deals with streak tracking and configuration of the dimmer.
     *
     * There is a hierarchy of components and their handlers:
     * ChallengeManager.updateResultsData() - Deals with recording mastery and survey results data.
     * ChallengeList.resolveQa() - Deals with calculating mastery and survey scores.
     * >ChallengeMain.resolveQa() - Deals with streaks and dimmer.
     * ChallengeResponse.resolveQa() - Deals with determining if user's input is correct or not.
     *
     * @param resolution
     * @param payload
     */
    this.resolveQa = (resolution, payload = null) => {
      const { currentQaProgress, qaData } = this.props;
      const { responseMode } = this.props.currentChallenge;

      let dimmerColor = null;
      let dimmerMessage = null;
      let dimmerExtra = null;
      let dimmerIcon = null;

      // Construct different dimmers...
      if (resolution === CHALLENGE_RESOLUTION_CORRECT) {
        const repeats =
          CHALLENGE_QUESTION_REPEAT[qaData.question.type][qaData.difficulty];
        dimmerColor = "olive";
        dimmerMessage = repeats > 1 ? deline`
          ${currentQaProgress.correctAnswerCount + 1 >= repeats ? "Success!" : "Correct!"}
          ${currentQaProgress.correctAnswerCount + 1} / ${repeats}
        ` : "Correct!";
        dimmerIcon = "check";

        if (responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
        responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
          // TODO - Survey re-choose support
          const { data } = qaData.answer;

          const miss = Math.abs(payload.answer - data.conversion.friendly);
          if (miss < 0.1) {
            dimmerExtra = deline`
              You answer,
              ${utils.unitWorder(payload.answer, data.toUnitWord, true)},
              was ${miss === 0 ? "" : "almost "}exactly right!
            `;
          } else {
            dimmerExtra = deline`
              Correct answer is
              ${utils.unitWorder(data.conversion.friendly, data.toUnitWord, true)}.
              Your answer:
              ${utils.unitWorder(payload.answer, data.toUnitWord, true)}.
            `;
          }
        }
      } else if (resolution === CHALLENGE_RESOLUTION_INCORRECT) {
        const strikes =
          CHALLENGE_MAX_STRIKES[qaData.question.type][qaData.difficulty];
        dimmerColor = "red";
        dimmerMessage = strikes > 1 ? deline`
          ${currentQaProgress.incorrectAnswerCount + 1 >= strikes ? "Failed!" : "Incorrect!"}
          ${currentQaProgress.incorrectAnswerCount + 1} / ${strikes}
        ` : "Incorrect!";
        dimmerIcon = "remove";

        if (responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
        responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
          // TODO - Survey re-choose support
          const { data } = qaData.answer;

          dimmerExtra = deline`
            The correct answer is
            ${data.conversion.friendly > payload.answer ? "greater" : "less"}
            than your answer: 
            ${utils.unitWorder(payload.answer, data.toUnitWord, true)}.
          `;
        }
      } else if (resolution === CHALLENGE_RESOLUTION_SURVEY_FILLED) {
        dimmerColor = "blue";
        dimmerMessage = "Survey Response Received!";
        dimmerIcon = "clipboard check";
      }

      this.setState({
        dimmerColor,
        dimmerMessage,
        dimmerExtra,
        dimmerIcon,
      });

      // Start the dimmer. When dimmer ends, the resolveQa() function gets called.
      dimmerStart(
        () => props.resolveQa(props.qaData.id, resolution, payload),
        dimmerExtra ?
          CHALLENGE_DIMMER_TIME_EXTRA : CHALLENGE_DIMMER_TIME_NO_EXTRA,
      );
    };

    // Resets the inputData, clearing the user's input.
    this.handleClearQa = () => this.props.updateCurrentChallengeData({ inputData: null });
  }

  render() {
    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmed}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ChallengeDetail
                qaData={this.props.qaData}
                showClearButton={utils.t0(this.props.currentChallenge.inputData)}
                responseMode={this.props.currentChallenge.responseMode}
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
                resolveQa={this.resolveQa}
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
            <div>
              <Header size="large" icon color={this.state.dimmerColor}>
                <Icon name={this.state.dimmerIcon} />
                {this.state.dimmerMessage}
              </Header>
              {this.state.dimmerExtra &&
                <p style={{ color: "black", fontSize: "larger" }}>
                  {this.state.dimmerExtra}
                </p>
              }
            </div>
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
    inputData: PropTypes.any,
    responseMode: PropTypes.number,
  }).isRequired,
  streak: PropTypes.number.isRequired,  // This is behind by +1 or -1 so adjustments will be needed
  resolveQa: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeMain;
