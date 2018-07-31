import React from "react";
import PropTypes from "prop-types";
import { Segment, Progress } from "semantic-ui-react";

import utils from "../../utils";

import MasteryToggle from "./MasteryToggle";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

const Mastery = (props) => {
  const { masteryData } = props;

  const color = masteryData.status === MASTERY_STATUS_ACTIVE ?
    utils.scoreProgressColor(masteryData.score, MASTERY_MAX_SCORE) : "grey";

  return (
    <Segment
      attached
      color={color}
    >
      <Progress
        percent={masteryData.score / (MASTERY_MAX_SCORE / 100)}
        color={color}
        active={masteryData.status === MASTERY_STATUS_ACTIVE}
      >
        Mastery {masteryData.score}/{MASTERY_MAX_SCORE}
      </Progress>
      {props.queryInfo &&
        <MasteryToggle
          queryInfo={props.queryInfo}
          masteryId={masteryData.id}
          masteryCurrentStatus={masteryData.status}
          buttonProps={{
            fluid: true,
          }}
        />
      }
    </Segment>
  );
};

Mastery.propTypes = {
  masteryData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }),
};

Mastery.defaultProps = {
  queryInfo: null,
};

export default Mastery;
