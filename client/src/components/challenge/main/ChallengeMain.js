import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Container, Dimmer, Grid, Header, Icon, Image, Transition } from "semantic-ui-react";
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
  CHALLENGE_IMAGES_DIMMER_SKIPPED,
  CHALLENGE_IMAGES_DIMMER_SURVEY_FILLED,
  CHALLENGE_IMAGES_DIMMER_CORRECT_STREAK,
  CHALLENGE_IMAGES_DIMMER_INCORRECT_STREAK,
} from "../../../constants";

import {
  QA_DATA_EVERYTHING,
} from "../../../propTypes";

class ChallengeMain extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dimmed: false,
      dimmerEndFunction: null,
      dimmerColor: "blue",
      dimmerMessage: "Done",
      dimmerExtra: null,
      dimmerAnswerDetail: null,
      dimmerIcon: "check",
      dimmerImage: "mascot/clipboard.gif",
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
        dimmerImage: CHALLENGE_IMAGES_DIMMER_SKIPPED,
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
      // Immediately lock the user's answer input.
      this.props.lockAnswer();

      const { currentQaProgress, qaData, streak } = this.props;
      const { responseMode } = this.props.currentQaProgress;

      let dimmerColor = null;
      let dimmerMessage = null;
      let dimmerExtra = null;
      let dimmerAnswerDetail = null;
      let dimmerIcon = null;
      let dimmerImage = null;

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
        dimmerImage = CHALLENGE_IMAGES_DIMMER_CORRECT_STREAK(streak > 0 ? streak + 1 : 1);

        if (qaData.answer.detail) {
          dimmerAnswerDetail = qaData.answer.detail;
        }

        if (responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
        responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
          // TODO - Survey re-choose support
          const { data } = qaData.answer;
          const payloadAnswer = parseFloat(payload.answer.slice(2));

          const miss = Math.abs(payloadAnswer - data.conversion.friendly);
          if (miss < 0.1) {
            dimmerExtra = deline`
              You answer,
              ${utils.unitWorder(payloadAnswer, data.toUnitWord, true)},
              was ${miss === 0 ? "" : "almost "}exactly right!
            `;
          } else {
            dimmerExtra = deline`
              Correct answer is
              ${utils.unitWorder(data.conversion.friendly, data.toUnitWord, true)}.
              Your answer:
              ${utils.unitWorder(payloadAnswer, data.toUnitWord, true)}.
            `;
          }
        }
      } else if (resolution === CHALLENGE_RESOLUTION_INCORRECT) {
        const strikes =
          CHALLENGE_MAX_STRIKES[qaData.question.type][qaData.difficulty];
        dimmerColor = "red";
        dimmerMessage = strikes > 1 ? deline`
          ${currentQaProgress.incorrectAnswers.length + 1 >= strikes ? "Failed!" : "Incorrect!"}
          ${currentQaProgress.incorrectAnswers.length + 1} / ${strikes}
        ` : "Incorrect!";
        dimmerIcon = "remove";
        dimmerImage = CHALLENGE_IMAGES_DIMMER_INCORRECT_STREAK(streak > 0 ? -1 : streak - 1);

        if (responseMode === CHALLENGE_RESPONSE_INPUT_DIRECT ||
        responseMode === CHALLENGE_RESPONSE_INPUT_SLIDER) {
          // TODO - Survey re-choose support
          const { data } = qaData.answer;
          const payloadAnswer = parseFloat(payload.answer.slice(2));

          dimmerExtra = deline`
            The correct answer is
            ${data.conversion.friendly > payloadAnswer ? "greater" : "less"}
            than your answer: 
            ${utils.unitWorder(payloadAnswer, data.toUnitWord, true)}.
          `;
        }
      } else if (resolution === CHALLENGE_RESOLUTION_SURVEY_FILLED) {
        dimmerColor = "blue";
        dimmerMessage = "Survey Response Received!";
        dimmerIcon = "clipboard check";
        dimmerImage = CHALLENGE_IMAGES_DIMMER_SURVEY_FILLED;
      }

      this.setState({
        dimmerColor,
        dimmerMessage,
        dimmerExtra,
        dimmerAnswerDetail,
        dimmerIcon,
        dimmerImage,
      });

      // Start the dimmer. When dimmer ends, the resolveQa() function gets called.
      dimmerStart(
        () => props.resolveQa(props.qaData.id, resolution, payload),
        (dimmerExtra || dimmerAnswerDetail) ?
          CHALLENGE_DIMMER_TIME_EXTRA : CHALLENGE_DIMMER_TIME_NO_EXTRA,
      );
    };

    // Resets the inputData, clearing the user's input.
    this.handleClearQa = () => this.props.updateCurrentChallengeData({ inputData: null });
  }

  render() {
    return (
      <Dimmer.Dimmable as={Container} dimmed={this.state.dimmed}>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <ChallengeDetail
                qaData={this.props.qaData}
                showClearButton={utils.t0(this.props.currentChallenge.inputData)}
                responseMode={this.props.currentQaProgress.responseMode}
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
                currentQaProgress={this.props.currentQaProgress}
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
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Image src={`/img/${this.state.dimmerImage}`} size="medium" centered />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header size="large" color={this.state.dimmerColor} textAlign="center">
                    <Header.Content>
                      <Icon name={this.state.dimmerIcon} />
                      {this.state.dimmerMessage}
                    </Header.Content>
                    {(this.state.dimmerExtra || this.state.dimmerAnswerDetail) &&
                      <Header.Subheader>
                        {this.state.dimmerExtra}
                        {this.state.dimmerExtra && this.state.dimmerAnswerDetail &&
                          <br />
                        }
                        <i>{this.state.dimmerAnswerDetail}</i>
                      </Header.Subheader>
                    }
                  </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Transition>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

ChallengeMain.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  currentQaProgress: PropTypes.shape({
    correctAnswerCount: PropTypes.number.isRequired,
    incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    responseMode: PropTypes.number,
  }).isRequired,
  currentChallenge: PropTypes.shape({
    inputData: PropTypes.any,
  }).isRequired,
  streak: PropTypes.number.isRequired,  // This is behind by +1 or -1 so adjustments will be needed
  resolveQa: PropTypes.func.isRequired,
  lockAnswer: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
  updateCurrentChallengeData: PropTypes.func.isRequired,
};

export default ChallengeMain;
