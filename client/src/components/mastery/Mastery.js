import React from "react";
import PropTypes from "prop-types";
import { Segment, Progress } from "semantic-ui-react";

import MasteryToggle from "./MasteryToggle";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_MAX_SCORE,
} from "../../constants";

const Mastery = (props) => {
  const { masteryData } = props;

  const masteryQuarters = MASTERY_MAX_SCORE / 4;
  let masteryColor;

  if (masteryData.score < masteryQuarters) masteryColor = "red";
  else if (masteryData.score < masteryQuarters * 2) masteryColor = "orange";
  else if (masteryData.score < masteryQuarters * 3) masteryColor = "yellow";
  else if (masteryData.score < masteryQuarters * 4) masteryColor = "olive";
  else masteryColor = "green";

  const color = masteryData.status === MASTERY_STATUS_ACTIVE ? masteryColor : "grey";

  return (
    <Segment
      attached
      color={color}
    >
      <Progress
        progress="percent"
        value={masteryData.score}
        total={MASTERY_MAX_SCORE}
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
