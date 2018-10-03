import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Grid, Header, Segment } from "semantic-ui-react";

import utils from "../../../utils";

import QueryHandler from "../../QueryHandler";
import ChallengeCompleteDetailScores from "./ChallengeCompleteDetailScores";
import ChallengeCompleteDetailAnswers from "./ChallengeCompleteDetailAnswers";

import {
  CHALLENGE_COMPLETE_QUESTIONS,
  CHALLENGE_COMPLETE_SUBSUBJECTS,
  CHALLENGE_COMPLETE_SURVEYS,
} from "../../../graphql/Queries";

import {
  MASTERY_MAX_SCORE,
  SURVEY_MAX_SCORE,
} from "../../../constants";

const ChallengeCompleteDetails = props => (
  <Grid stackable stretched columns="equal">
    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Header size="large">
            SubSubject Mastery Scores
          </Header>
          {props.challengeResults.masteryscoreinput.length ?
            <Query
              query={CHALLENGE_COMPLETE_SUBSUBJECTS}
              variables={{
                studentId: props.challengeResults.studentid,
                subSubjectIds:
                  props.challengeResults.masteryscoreinput.map(row => row.subsubjectid),
              }}
            >
              {queryProps => (
                <QueryHandler
                  queryData={queryProps}
                >
                  {queryProps.data && queryProps.data.subSubjects ?
                    <ChallengeCompleteDetailScores
                      showScoreUpdate
                      maxScore={MASTERY_MAX_SCORE}
                      scoreUpdates={queryProps.data.subSubjects.map(row => (
                        {
                          id: row.id,
                          label: row.name,
                          existingScore: (row.masteries.length && row.masteries[0].score) || 0,
                          scoreChange: utils.cacheGetTarget(
                            props.challengeResults.masteryscoreinput,
                            row.id,
                            "score",
                            "subsubjectid",
                          ),
                        }
                      ))}
                    />
                    :
                    <span>&nbsp;</span>
                  }
                </QueryHandler>
              )}
            </Query>
            :
            <p>No changes.</p>
          }
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment>
          <Header size="large">
            Survey Mastery Scores
          </Header>
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
                    <ChallengeCompleteDetailScores
                      showScoreUpdate
                      maxScore={SURVEY_MAX_SCORE}
                      scoreUpdates={queryProps.data.surveys.map(row => (
                        {
                          id: row.id,
                          label: utils.stringTruncator(
                            utils.questionTextGrabber(row.question.question),
                            45,
                          ),
                          existingScore: row.score,
                          scoreChange: utils.cacheGetTarget(
                            props.challengeResults.surveyscoreinput,
                            row.id,
                            "score",
                            "surveyid",
                          ),
                        }
                      ))}
                    />
                    :
                    <span>&nbsp;</span>
                  }
                </QueryHandler>
              )}
            </Query>
            :
            <p>No changes.</p>
          }
        </Segment>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Segment>
          <Header size="large">
            Survey Responses
          </Header>
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
                    <ChallengeCompleteDetailAnswers
                      surveyQuestionAnswers={queryProps.data.questions.map(row => (
                        {
                          ...utils.cacheGetTarget(
                            props.challengeResults.surveyanswerinput,
                            row.id,
                            [],
                            "questionid",
                          ),
                          question: utils.questionTextGrabber(row.question),
                        }
                      ))}
                    />
                    :
                    <span>&nbsp;</span>
                  }
                </QueryHandler>
              )}
            </Query>
            :
            <p>No new surveys filled.</p>
          }
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
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
