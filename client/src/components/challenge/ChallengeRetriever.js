import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import QueryHandler from "../QueryHandler";

import {
  GENERATE_CHALLENGE,
  GET_QA_QUESTIONS_WITH_STUDENT,
} from "../../graphql/Queries";

const ChallengeRetriever = (props) => {
  const questionMode = !props.challengeConfig;
  const queryName = questionMode ? "getQa" : "generateChallenge";

  const query = questionMode ? GET_QA_QUESTIONS_WITH_STUDENT : GENERATE_CHALLENGE;
  const variables = questionMode ?
    {
      studentid: props.studentId,
      questionids: props.questionListConfig.questionIds,
    } : {
      studentid: props.studentId,
      subsubjectids: props.challengeConfig.selectedSubSubjectIds,
      listsize: props.challengeConfig.listSize,
      ignorerarity: props.challengeConfig.ignoreRarity,
      ignoredifficulty: props.challengeConfig.ignoreDifficulty,
      ignorepreference: props.challengeConfig.ignorePreference,
    };


  return (
    <Query
      query={query}
      variables={variables}
    >
      {queryProps => (
        <QueryHandler
          queryData={queryProps}
        >
          {queryProps.data && queryProps.data[queryName] ?
            <Redirect
              to={{
                pathname: `/challenge/play/${props.challengeId}`,
                state: {
                  challengeId: props.challengeId,
                  challengeData: queryProps.data[queryName],
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
};

ChallengeRetriever.propTypes = {
  challengeId: PropTypes.string.isRequired,
  studentId: PropTypes.string.isRequired,
  challengeConfig: PropTypes.shape({
    selectedSubSubjectIds: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
    listSize: PropTypes.number.isRequired,
    ignoreRarity: PropTypes.bool,
    ignoreDifficulty: PropTypes.bool,
    ignorePreference: PropTypes.bool,
  }),
  questionListConfig: PropTypes.shape({
    questionIds: PropTypes.arrayOf(
      PropTypes.string.isRequired,
    ).isRequired,
  }),
};

ChallengeRetriever.defaultProps = {
  challengeConfig: null,
  questionListConfig: null,
};

export default ChallengeRetriever;
