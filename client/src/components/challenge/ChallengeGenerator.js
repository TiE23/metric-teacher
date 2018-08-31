import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import QueryHandler from "../QueryHandler";

import {
  GENERATE_CHALLENGE,
} from "../../graphql/Queries";

const ChallengeGenerator = props => (
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
              pathname: "/challenge/play",
              state: {
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

ChallengeGenerator.propTypes = {
  studentId: PropTypes.string.isRequired,
  selectedSubSubjectIds: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  listSize: PropTypes.number.isRequired,
  ignoreRarity: PropTypes.bool,
  ignoreDifficulty: PropTypes.bool,
  ignorePreference: PropTypes.bool,
};

ChallengeGenerator.defaultProps = {
  ignoreRarity: false,
  ignoreDifficulty: false,
  ignorePreference: false,
};

export default ChallengeGenerator;
