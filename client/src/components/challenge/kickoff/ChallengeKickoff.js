import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { Button, Checkbox, Dropdown, Grid, Header, Icon, Popup, Segment } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import ChallengeKickoffSelector from "./ChallengeKickoffSelector";

import {
  STUDENT_ACTIVE_SUBJECTS,
} from "../../../graphql/Queries";

import {
  CHALLENGE_KICKOFF_LENGTH_OPTIONS,
} from "../../../constants";

const ChallengeKickoff = props => ( // TODO - Handle students with no active masteries.
  <Query
    query={STUDENT_ACTIVE_SUBJECTS}
    variables={{ studentid: props.studentId }}
    fetchPolicy="network-only"
  >
    {queryProps => (
      <QueryHandler
        queryData={queryProps}
        loadingErrorProps={{
          errorHeader: "You have no Subjects assigned yet!",
          errorMessage: (
            <p>
              Review your <Link to="/user/me">User Profile</Link> and make sure you have Enrolled,
              joined a Course, and assigned yourself <Link to="/subjects">Subjects</Link> first.
              Do not worry, this process takes only a few seconds.
            </p>
          ),
        }}
      >
        <Header size="large" textAlign="center">
          <Header.Content>
            <Icon name="bolt" />
            Challenge Kickoff
            <Header.Subheader>
              Customize your next Challenge.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <br />
        <ChallengeKickoffSelector
          masteriesData={queryProps.data && queryProps.data.activeMasteries}
          selectedSubSubjectIds={props.selectedSubSubjectIds}
          updateSubSubjectIds={props.updateSubSubjectIds}
        />
        <Segment attached="top">
          <Grid stackable columns="equal" verticalAlign="middle">
            <Grid.Row>
              <Grid.Column>
                <Header size="medium">
                  <Icon name="settings" />
                  <Header.Content>
                    Options
                    <Header.Subheader>
                      Customize your challenge.
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Dropdown
                  icon="wait"
                  onChange={props.updateChallengeLength}
                  options={CHALLENGE_KICKOFF_LENGTH_OPTIONS}
                  placeholder="Choose a length"
                  selection
                  value={props.challengeLength}
                />
              </Grid.Column>
              <Grid.Column>
                <Checkbox
                  label="Ignore Difficulty"
                  onChange={props.updateIgnoreDifficulty}
                  checked={props.ignoreDifficulty}
                />
                {" "}
                <Popup
                  trigger={(<Icon name="info circle" />)}
                  content="When new to a SubSubject you'll be given easier questions. With experience you'll be challenged by more difficult questions. Check this box to show all questions no matter your mastery score on a SubSubject."
                  position="top center"
                  inverted
                  hideOnScroll
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button
          color="teal"
          attached="bottom"
          size="large"
          onClick={props.handleChallengeModeStart}
          disabled={!props.selectedSubSubjectIds.length}
        >
          Start Challenge!
        </Button>

        {/* TODO - Remove this */}
        <br />
        <button
          onClick={props.handleQuestionModeStart}
        >
          Question List Start! (Dev)
        </button>
      </QueryHandler>
    )}
  </Query>
);

ChallengeKickoff.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  challengeLength: PropTypes.number.isRequired,
  ignoreDifficulty: PropTypes.bool.isRequired,
  updateSubSubjectIds: PropTypes.func.isRequired,
  updateChallengeLength: PropTypes.func.isRequired,
  updateIgnoreDifficulty: PropTypes.func.isRequired,
  handleChallengeModeStart: PropTypes.func.isRequired,
  handleQuestionModeStart: PropTypes.func.isRequired,
};

export default ChallengeKickoff;
