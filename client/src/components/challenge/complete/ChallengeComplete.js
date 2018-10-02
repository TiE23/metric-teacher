import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import LoadingButton from "../../misc/LoadingButton";
import ChallengeCompleteDetails from "./ChallengeCompleteDetails";

import {
  ADD_CHALLENGE_RESULTS,
} from "../../../graphql/Mutations";

const ChallengeComplete = (props) => {
  const onCompleted = () => {
    props.markChallengeResultsSubmitted();
  };

  return (
    <div>
      <p>Challenge Complete! You answered {props.qaCount} questions.</p>
      <ChallengeCompleteDetails
        challengeResults={props.challengeResults}
      />
      {props.challengeSubmitted ?
        <p>Submitted successfully!</p>
        :
        <Mutation
          mutation={ADD_CHALLENGE_RESULTS}
          onCompleted={onCompleted}
        >
          {(addChallengeResults, { loading, error }) => (
            <LoadingButton
              onClick={() => addChallengeResults({
                variables: props.challengeResults,
              })}
              loading={loading}
              error={error}
              buttonText="Submit Results"
              buttonProps={{
                fluid: true,
                primary: true,
              }}
            />
          )}
        </Mutation>
      }
      <pre>
        {JSON.stringify(props.challengeResults, null, 2)}
      </pre>
    </div>
  );
};

ChallengeComplete.propTypes = {
  qaCount: PropTypes.number.isRequired,
  challengeResults: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  challengeSubmitted: PropTypes.bool.isRequired,
  markChallengeResultsSubmitted: PropTypes.func.isRequired,
};

export default ChallengeComplete;
