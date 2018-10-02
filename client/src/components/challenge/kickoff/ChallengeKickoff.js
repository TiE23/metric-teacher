import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Button, Checkbox, Dropdown, Grid, Header, Icon, Segment } from "semantic-ui-react";

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
      >
        <ChallengeKickoffSelector
          masteriesData={queryProps.data && queryProps.data.activeMasteries}
          selectedSubSubjectIds={props.selectedSubSubjectIds}
          updateSubSubjectIds={props.updateSubSubjectIds}
        />
        <Segment>
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
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <br />
        <Button
          onClick={props.handleChallengeModeStart}
          disabled={!props.selectedSubSubjectIds.length}
        >
          Challenge Start!
        </Button>
        <Button
          onClick={props.handleQuestionModeStart}
        >
          Question List Start!
        </Button>
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
