import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import cuid from "cuid";

import utils from "../../utils";

import ChallengeFrame from "./ChallengeFrame";
import ChallengeRetriever from "./ChallengeRetriever";
import ChallengeManager from "./ChallengeManager";
import ChallengeKickoff from "./kickoff/ChallengeKickoff";
import LoadingError from "../misc/LoadingError";

import {
  CHALLENGE_KICKOFF_IGNORE_DIFFICULTY_DEFAULT,
  CHALLENGE_KICKOFF_LENGTH_DEFAULT,
  USER_TYPE_STUDENT,
} from "../../constants";

class ChallengePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubSubjectIds: [],
      selectedQuestionIds: [],
      challengeLength: CHALLENGE_KICKOFF_LENGTH_DEFAULT,
      ignoreDifficulty: CHALLENGE_KICKOFF_IGNORE_DIFFICULTY_DEFAULT,
      challengeModeStart: false,
      questionModeStart: false,
      challengeId: null,
    };

    this.updateSubSubjectIds = (selectedSubSubjectIds) => {
      this.setState({ selectedSubSubjectIds });
    };

    this.updateChallengeLength = (e, { value }) => {
      this.setState({ challengeLength: value });
    };

    this.updateIgnoreDifficulty = () => {
      this.setState(prevState => ({ ignoreDifficulty: !prevState.ignoreDifficulty }));
    };

    this.handleChallengeModeStart = () => {
      this.setState({
        challengeModeStart: true,
        challengeId: cuid.slug(),
      });
    };

    this.handleQuestionModeStart = () => {
      this.setState({
        questionModeStart: true,
        challengeId: cuid.slug(),
        selectedQuestionIds: [
          "cjk1pagr1007c07938z7pnh2x",
          "cjk1pagrj007k07933cf9py49", // Written (w/ answer detail)
          // "cjkkls86v021h0893gsthx41f", // Written (w/ media)
          // "cjk1pagkz0050079321fkd6vx", // Conversion (simple)
          // "cjk1pago700680793uvc6i2a2", // Conversion (annotated)
          // "cjk1pags0007s07935j429s79", // Conversion (annotated, from metric)
          // "cjk1pah3400d00793jhfmbq66", // Conversion (to floz)
          // "cjk1pagpd006o0793yws3ys7n", // Survey (answered by 001)
          // "cjk1pagq800700793jwuow8zp", // Survey (answered by 001, has note)
          // "cjk1pah7b00f407935bgx9w8z", // Survey (not answered by 001)
        ],
      });
    };
  }

  render() {
    const { userTokenData, location } = this.props;
    const { params } = this.props.match;

    let content;
    if (userTokenData.type === USER_TYPE_STUDENT) {
      if (params.mode === "kickoff") {  // Kickoff mode.
        if (this.state.challengeModeStart) {
          content = (
            <Redirect
              to={{
                pathname: "/challenge/challengeload",
                state: {
                  challengeId: this.state.challengeId,
                  selectedSubSubjectIds: this.state.selectedSubSubjectIds,
                  challengeLength: this.state.challengeLength,
                  ignoreDifficulty: this.state.ignoreDifficulty,
                },
              }}
              push
            />
          );
        } else if (this.state.questionModeStart) {
          content = (
            <Redirect
              to={{
                pathname: "/challenge/questionload",
                state: {
                  challengeId: this.state.challengeId,
                  selectedQuestionIds: this.state.selectedQuestionIds,
                },
              }}
              push
            />
          );
        } else {
          content = (
            <ChallengeKickoff
              studentId={userTokenData.id}
              selectedSubSubjectIds={this.state.selectedSubSubjectIds}
              challengeLength={this.state.challengeLength}
              ignoreDifficulty={this.state.ignoreDifficulty}
              updateSubSubjectIds={this.updateSubSubjectIds}
              updateIgnoreDifficulty={this.updateIgnoreDifficulty}
              updateChallengeLength={this.updateChallengeLength}
              handleChallengeModeStart={this.handleChallengeModeStart}
              handleQuestionModeStart={this.handleQuestionModeStart}
            />
          );
        }
      } else if (params.mode === "challengeload" &&  // Challenge mode load.
      (location.state && location.state.selectedSubSubjectIds)) {
        content = (
          <ChallengeRetriever
            studentId={userTokenData.id}
            challengeId={location.state.challengeId}
            challengeConfig={{
              selectedSubSubjectIds: location.state.selectedSubSubjectIds,
              challengeLength: location.state.challengeLength,
              ignoreRarity: false,
              ignoreDifficulty: location.state.ignoreDifficulty,
              ignorePreference: false,
            }}
          />
        );
      } else if (params.mode === "questionload" &&  // Question mode load.
      (location.state && location.state.selectedQuestionIds)) {
        content = (
          <ChallengeRetriever
            studentId={userTokenData.id}
            challengeId={location.state.challengeId}
            questionListConfig={{
              questionIds: location.state.selectedQuestionIds,
            }}
          />
        );
      } else if (params.mode === "play") {  // Play mode.
        if (params.challengeId) {
          const localChallengeState = utils.readChallengeStateLocalStorage();
          // Check that the challenge found in the storage is the correct one.
          if (localChallengeState && localChallengeState.challengeId === params.challengeId) {
            // Resume challenge from saved state.
            content = (
              <ChallengeManager
                challengeState={localChallengeState}
                studentId={userTokenData.id}
              />
            );
          } else if (location.state && location.state.challengeId === params.challengeId &&
          location.state.challengeData) {
            // New challenge.
            content = (
              <ChallengeManager
                challengeState={{
                  challengeId: params.challengeId,
                  challengeData: location.state.challengeData,
                }}
                studentId={userTokenData.id}
              />
            );
          } else {
            // Bad challengeId, maybe a user just put it in?
            content = (<p>Bad challengeId.</p>); // TODO - Nicer component w/link to /kickoff.
          }
        } else {
          content = (<p>You need a challengeId.</p>); // TODO - Nicer component w/link to /kickoff.
        }
      } else {  // Default to /kickoff
        content = (
          <Redirect to="/challenge/kickoff" />
        );
      }
    } else {  // Not a student
      content = (
        <LoadingError
          error
          errorHeader="Students Only"
          errorMessage="Only students can participate in a challenge."
        />
      );
    }

    return (
      <ChallengeFrame>
        {content}
      </ChallengeFrame>
    );
  }
}

ChallengePage.propTypes = {
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      mode: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      selectedSubSubjectIds: PropTypes.arrayOf(PropTypes.string.isRequired),
      challengeLength: PropTypes.number,
      ignoreDifficulty: PropTypes.bool,
      challengeState: PropTypes.shape({
        challengeId: PropTypes.string.isRequired,
        challengeData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
        challengeProgress: PropTypes.object.isRequired,
        challengeResults: PropTypes.object.isRequired,
      }),
    }),
  }).isRequired,
};

export default withRouter(ChallengePage);
