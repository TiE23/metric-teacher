import React from "react";
import PropTypes from "prop-types";
import { Button, Progress, Transition } from "semantic-ui-react";

// TODO - Add confirm modal for skip button.
// Make it a prop option, perhaps only show it when skipping a survey answer?

const ChallengeMultipurposeBar = props => (
  <div>
    <Transition
      animation="vertical flip"
      visible={props.showSubmitButton}
      duration={{ show: 400, hide: 0 }}
      unmountOnHide
    >
      <div>
        <Button
          onClick={props.resolveQa}
          color="olive"
          fluid
        >
          Submit
        </Button>
        <br />
      </div>
    </Transition>
    <Transition
      animation="vertical flip"
      visible={!props.showSubmitButton}
      duration={{ show: 400, hide: 0 }}
      unmountOnHide
    >
      <Progress
        percent={
          ((props.challengeCompletion.total - props.challengeCompletion.remaining) /
            props.challengeCompletion.total) * 100
        }
        size="medium"
        indicating
      />
    </Transition>
  </div>
);

ChallengeMultipurposeBar.propTypes = {
  showSubmitButton: PropTypes.bool.isRequired,
  resolveQa: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeMultipurposeBar;
