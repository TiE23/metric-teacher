import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

import ChallengeFrame from "./ChallengeFrame";
import ChallengeContainer from "./ChallengeContainer";
import ChallengeHandler from "./ChallengeHandler";
import ChallengeKickoff from "./kickoff/ChallengeKickoff";
import LoadingError from "../misc/LoadingError";

import {
  USER_TYPE_STUDENT,
} from "../../constants";
import QueryHandler from "../QueryHandler";

class ChallengePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubSubjectIds: [],
      kickedOff: false,
    };

    this.updateSubSubjectIds = (selectedSubSubjectIds) => {
      this.setState({ selectedSubSubjectIds });
    };

    this.handleKickoff = () => {
      this.setState({ kickedOff: true });
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
                  selectedSubSubjectIds: this.state.selectedSubSubjectIds,
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
              updateSubSubjectIds={this.updateSubSubjectIds}
              handleKickoff={this.handleKickoff}
            />
          );
        }
      } else if (params.mode === "loading" &&  // Loading mode.
      (location.state && location.state.selectedSubSubjectIds)) {
        content = (
          <ChallengeContainer
            studentId={userTokenData.id}
            selectedSubSubjectIds={location.state.selectedSubSubjectIds}
            listSize={2}
            ignoreRarity={false}
            ignoreDifficulty={false}
            ignorePreference={false}
          />
        );
      } else if (params.mode === "play" &&  // Play mode.
      (location.state && location.state.challengeData)) {
        content = (
          <ChallengeHandler
            challengeData={location.state.challengeData}
          />
        );
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
      challengeData: PropTypes.arrayOf(PropTypes.object.isRequired),
    }),
  }).isRequired,
};

export default withRouter(ChallengePage);