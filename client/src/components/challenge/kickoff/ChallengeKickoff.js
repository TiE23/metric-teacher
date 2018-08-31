import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Button } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import ChallengeKickoffSelector from "./ChallengeKickoffSelector";

import {
  STUDENT_ACTIVE_SUBJECTS,
} from "../../../graphql/Queries";

class ChallengeKickoff extends PureComponent {
  render() {
    return (  // TODO - Handle students with no active masteries.
      <Query
        query={STUDENT_ACTIVE_SUBJECTS}
        variables={{ studentid: this.props.studentId }}
        fetchPolicy="network-only"
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
          >
            <p>ChallengeKickoff</p>
            <ChallengeKickoffSelector
              masteriesData={queryProps.data && queryProps.data.activeMasteries}
              selectedSubSubjectIds={this.props.selectedSubSubjectIds}
              updateSubSubjectIds={this.props.updateSubSubjectIds}
            />
            <Button
              onClick={this.props.handleKickoff}
              disabled={!this.props.selectedSubSubjectIds.length}
            >
              Kickoff!
            </Button>
          </QueryHandler>
        )}
      </Query>
    );
  }
}

ChallengeKickoff.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  updateSubSubjectIds: PropTypes.func.isRequired,
  handleKickoff: PropTypes.func.isRequired,
};

export default ChallengeKickoff;
