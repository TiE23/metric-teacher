import React from "react";
import PropTypes from "prop-types";
import { Button, Progress, Transition } from "semantic-ui-react";


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
          onClick={props.handleSubmit}
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
  handleSubmit: PropTypes.func.isRequired,
  challengeCompletion: PropTypes.shape({
    total: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired,
  }).isRequired,
};

export default ChallengeMultipurposeBar;
