import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import { Button, Container, Divider, Grid, Header, Icon } from "semantic-ui-react";

import LoadingButton from "../../misc/LoadingButton";
import ChallengeCompleteDetails from "./ChallengeCompleteDetails";

import {
  ADD_CHALLENGE_RESULTS,
} from "../../../graphql/Mutations";

import {
  FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM,
  FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL,
} from "../../../constants";

const ChallengeComplete = (props) => {
  const onCompleted = () => {
    props.markChallengeResultsSubmitted();
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
          <Header size="large" textAlign="center">
            <Header.Content>
              <Icon name="flag checkered" />
              Challenge Complete
              <Header.Subheader>
                You faced {props.qaCount} questions.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        {props.challengeSubmitted ?
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_FULL}>
            <ChallengeCompleteDetails
              challengeResults={props.challengeResults}
            />
          </Grid.Column>
          :
          <Mutation
            mutation={ADD_CHALLENGE_RESULTS}
            onCompleted={onCompleted}
          >
            {(addChallengeResults, { loading, error }) => (
              <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
                <LoadingButton
                  onClick={() => addChallengeResults({
                    variables: props.challengeResults,
                  })}
                  loading={loading}
                  error={error}
                  buttonText="Submit To See Your Results"
                  buttonProps={{
                    fluid: true,
                    color: "olive",
                  }}
                />
              </Grid.Column>
            )}
          </Mutation>
        }
      </Grid.Row>

      {props.challengeSubmitted &&
        <Grid.Row>
          <Grid.Column {...FLOATING_CENTER_GRID_COLUMN_WIDTH_MEDIUM}>
            <Container textAlign="center">
              Think you can do better?
              <br />
              Drive right back into it with another Challenge!
            </Container>
            <Divider />
            <Button
              as={Link}
              color="green"
              to="/challenge/kickoff"
              fluid
            >
              <Icon name="bolt" />
              Rematch!
            </Button>
          </Grid.Column>
        </Grid.Row>
      }
    </Grid>
  );
};

ChallengeComplete.propTypes = {
  qaCount: PropTypes.number.isRequired,
  challengeResults: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  challengeSubmitted: PropTypes.bool.isRequired,
  markChallengeResultsSubmitted: PropTypes.func.isRequired,
};

export default ChallengeComplete;
