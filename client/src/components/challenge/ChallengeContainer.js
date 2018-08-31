import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../QueryHandler";

import {
  GENERATE_CHALLENGE,
} from "../../graphql/Queries";

import ChallengeHandler from "./ChallengeHandler";

const ChallengeContainer = props => (
  <Query
    query={GENERATE_CHALLENGE}
    variables={{
      studentid: props.studentId,
      subsubjectids: props.selectedSubSubjectIds,
      listsize: props.listSize,
      ignorerarity: props.ignoreRarity,
      ignoredifficulty: props.ignoreDifficulty,
      ignorepreference: props.ignorePreference,
    }}
  >
    {queryProps => (
      <QueryHandler
        queryData={queryProps}
      >
        <ChallengeHandler
          challenge={queryProps.data && queryProps.data.generateChallenge}
        />
      </QueryHandler>
    )}
  </Query>
);

ChallengeContainer.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  listSize: PropTypes.number.isRequired,
  ignoreRarity: PropTypes.bool,
  ignoreDifficulty: PropTypes.bool,
  ignorePreference: PropTypes.bool,
};

ChallengeContainer.defaultProps = {
  ignoreRarity: false,
  ignoreDifficulty: false,
  ignorePreference: false,
};

export default ChallengeContainer;
