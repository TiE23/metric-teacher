import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../../QueryHandler";

import {
  CHALLENGE_COMPLETE_QUESTIONS,
  CHALLENGE_COMPLETE_SUBSUBJECTS, CHALLENGE_COMPLETE_SURVEYS,
} from "../../../graphql/Queries";


const ChallengeCompleteDetails = props => (
  <div>
    <p>Mastery Scores</p>
    {props.challengeResults.masteryscoreinput.length ?
      <Query
        query={CHALLENGE_COMPLETE_SUBSUBJECTS}
        variables={{
          studentId: props.challengeResults.studentid,
          subSubjectIds: props.challengeResults.masteryscoreinput.map(row => row.subsubjectid),
        }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
          >
            {queryProps.data && queryProps.data.subSubjects ?
              <pre>
                {JSON.stringify(queryProps.data.subSubjects, null, 2)}
              </pre>
              :
              <p>Blank</p>
            }
          </QueryHandler>
        )}
      </Query>
      :
      null
    }
    <p>Survey Scores</p>
    {props.challengeResults.surveyscoreinput.length ?
      <Query
        query={CHALLENGE_COMPLETE_SURVEYS}
        variables={{
          surveyIds: props.challengeResults.surveyscoreinput.map(row => row.surveyid),
        }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
          >
            {queryProps.data && queryProps.data.surveys ?
              <pre>
                {JSON.stringify(queryProps.data.surveys, null, 2)}
              </pre>
              :
              <p>Blank</p>
            }
          </QueryHandler>
        )}
      </Query>
      :
      null
    }
    <p>Survey Answers</p>
    {props.challengeResults.surveyanswerinput.length ?
      <Query
        query={CHALLENGE_COMPLETE_QUESTIONS}
        variables={{
          questionIds: props.challengeResults.surveyanswerinput.map(row => row.questionid),
        }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
          >
            {queryProps.data && queryProps.data.questions ?
              <pre>
                {JSON.stringify(queryProps.data.questions, null, 2)}
              </pre>
              :
              <p>Blank</p>
            }
          </QueryHandler>
        )}
      </Query>
      :
      null
    }
  </div>
);

ChallengeCompleteDetails.propTypes = {
  challengeResults: PropTypes.shape({
    studentid: PropTypes.string.isRequired,
    masteryscoreinput: PropTypes.arrayOf(PropTypes.shape({
      subsubjectid: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })),
    surveyscoreinput: PropTypes.arrayOf(PropTypes.shape({
      surveyid: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })),
    surveyanswerinput: PropTypes.arrayOf(PropTypes.shape({
      questionid: PropTypes.string.isRequired,
      skip: PropTypes.bool.isRequired,
      value: PropTypes.number,
      unit: PropTypes.string,
      detail: PropTypes.string,
    })),
  }).isRequired,
};

export default ChallengeCompleteDetails;
