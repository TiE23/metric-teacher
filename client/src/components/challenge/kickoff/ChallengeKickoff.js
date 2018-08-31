import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Button } from "semantic-ui-react";

import QueryHandler from "../../QueryHandler";
import ChallengeKickoffSelector from "./ChallengeKickoffSelector";

import {
  STUDENT_ACTIVE_SUBJECTS,
} from "../../../graphql/Queries";

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
        <p>ChallengeKickoff</p>
        <ChallengeKickoffSelector
          masteriesData={queryProps.data && queryProps.data.activeMasteries}
          selectedSubSubjectIds={props.selectedSubSubjectIds}
          updateSubSubjectIds={props.updateSubSubjectIds}
        />
        <Button
          onClick={props.handleKickoff}
          disabled={!props.selectedSubSubjectIds.length}
        >
          Kickoff!
        </Button>
      </QueryHandler>
    )}
  </Query>
);

ChallengeKickoff.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  updateSubSubjectIds: PropTypes.func.isRequired,
  handleKickoff: PropTypes.func.isRequired,
};

export default ChallengeKickoff;
