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
  return (
    <Segment>
      <Progress
        progress="percent"
        value={masteryData.score}
        total={MASTERY_MAX_SCORE}
        color={masteryData.status === MASTERY_STATUS_ACTIVE ? "olive" : "red"}
        active={masteryData.status === MASTERY_STATUS_ACTIVE}
      >
        Mastery <i>{masteryData.score}/{MASTERY_MAX_SCORE}</i>
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
