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
  USER_TYPE_STUDENT,
} from "../../constants";

class ChallengePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubSubjectIds: [],
      ignoreDifficulty: true,
      kickedOff: false,
      challengeId: null,
    };

    this.updateSubSubjectIds = (selectedSubSubjectIds) => {
      this.setState({ selectedSubSubjectIds });
    };

    this.updateIgnoreDifficulty = () => {
      this.setState(prevState => ({ ignoreDifficulty: !prevState.ignoreDifficulty }));
    };

    this.handleKickoff = () => {
      this.setState({
        kickedOff: true,
        challengeId: cuid.slug(),
      });
    };
  }

  render() {
    const { userTokenData, location } = this.props;
    const { params } = this.props.match;

    let content;
    if (userTokenData.type === USER_TYPE_STUDENT) {
      if (params.mode === "kickoff") {  // Kickoff mode.
        if (this.state.kickedOff) {
          content = (
            <Redirect
              to={{
                pathname: "/challenge/loading",
                state: {
                  challengeId: this.state.challengeId,
                  selectedSubSubjectIds: this.state.selectedSubSubjectIds,
                  ignoreDifficulty: this.state.ignoreDifficulty,
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
              ignoreDifficulty={this.state.ignoreDifficulty}
              updateSubSubjectIds={this.updateSubSubjectIds}
              updateIgnoreDifficulty={this.updateIgnoreDifficulty}
              handleKickoff={this.handleKickoff}
            />
          );
        }
      } else if (params.mode === "loading" &&  // Loading mode.
      (location.state && location.state.selectedSubSubjectIds)) {
        content = (
          <ChallengeRetriever
            challengeId={location.state.challengeId}
            studentId={userTokenData.id}
            selectedSubSubjectIds={location.state.selectedSubSubjectIds}
            listSize={2}
            ignoreRarity={false}
            ignoreDifficulty={location.state.ignoreDifficulty}
            ignorePreference={false}
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
              />
            );
          } else if (location.state && location.state.challengeId === params.challengeId &&
          location.state.challengeData) {
            // New challenge.
            utils.removeChallengeStateLocalStorage(); // Delete any state if present.
            content = (
              <ChallengeManager
                challengeState={{
                  challengeId: params.challengeId,
                  challengeData: location.state.challengeData,
                }}
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
        <p>ChallengePage</p>
        <p>
          SubSubjects Selected:
          {" "}
          {this.state.selectedSubSubjectIds.length}
        </p>
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
