import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import ChallengeFrame from "./ChallengeFrame";
import ChallengeContainer from "./ChallengeContainer";
import ChallengeKickoff from "./kickoff/ChallengeKickoff";
import LoadingError from "../misc/LoadingError";

import {
  USER_TYPE_STUDENT,
} from "../../constants";

class ChallengePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedSubSubjectIds:
        (this.props.location.state && this.props.location.state.selectedSubSubjectIds) || [],
      kickedOff: false,
    };

    this.updateSubSubjectIds = selectedSubSubjectIds => this.setState({ selectedSubSubjectIds });
    this.handleKickoff = () => this.setState({ kickedOff: true });
  }

  render() {
    const { userTokenData } = this.props;
    const { params } = this.props.match;

    let content;
    if (userTokenData.type === USER_TYPE_STUDENT) {
      if (params.mode === "kickoff") {
        if (this.state.kickedOff) {
          content = (
            <ChallengeContainer
              studentId={userTokenData.id}
              selectedSubSubjectIds={this.state.selectedSubSubjectIds}
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
      }
    } else {
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
      // eslint-disable-next-line react/forbid-prop-types
      selectedSubSubjectIds: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export default withRouter(ChallengePage);
