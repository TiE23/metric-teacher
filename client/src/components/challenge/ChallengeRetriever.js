import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import QueryHandler from "../QueryHandler";

import {
  GENERATE_CHALLENGE,
} from "../../graphql/Queries";

const ChallengeRetriever = props => (
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
        {queryProps.data && queryProps.data.generateChallenge ?
          <Redirect
            to={{
              pathname: `/challenge/play/${props.challengeId}`,
              state: {
                challengeId: props.challengeId,
                challengeData: queryProps.data.generateChallenge,
              },
            }}
          />
          :
          <span>&nbsp;</span>
        }
      </QueryHandler>
    )}
  </Query>
);

ChallengeRetriever.propTypes = {
  challengeId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  listSize: PropTypes.number.isRequired,
  ignoreRarity: PropTypes.bool,
  ignoreDifficulty: PropTypes.bool,
  ignorePreference: PropTypes.bool,
};

ChallengeRetriever.defaultProps = {
  ignoreRarity: false,
  ignoreDifficulty: false,
  ignorePreference: false,
};

export default ChallengeRetriever;
