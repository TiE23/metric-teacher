import React from "react";
import PropTypes from "prop-types";
import { List, Progress } from "semantic-ui-react";

import utils from "../../../utils";

import {
  CHALLENGE_COMPLETE_SMALL_SCORE_COUNT_MINIMUM,
} from "../../../constants";

const ChallengeCompleteDetailScores = props => (
  <List>
    {props.scoreUpdates.map(row => (
      <List.Item key={row.id}>
        <Progress
          value={(utils.minMax(
            0,
            row.currentScore - (props.showScoreUpdate ? 0 : row.scoreChange),
            props.maxScore,
          ))}
          total={props.maxScore}
          progress="value"
          size={props.scoreUpdates.length >= CHALLENGE_COMPLETE_SMALL_SCORE_COUNT_MINIMUM ?
            "small" : "medium"}
          active={props.showScoreUpdate && row.scoreChange > 0}
          color={row.scoreChange > 0 ? "olive" : "red"}
        >
          {row.label}
          {" "}
          ({props.showScoreUpdate ?
            row.scoreChange >= 0 ?
              `+${row.scoreChange}` : `${row.scoreChange}`
            : "+ ?"})
        </Progress>
      </List.Item>
    ))}
  </List>
);

ChallengeCompleteDetailScores.propTypes = {
  showScoreUpdate: PropTypes.bool.isRequired,
  maxScore: PropTypes.number.isRequired,
  scoreUpdates: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.node.isRequired,
    currentScore: PropTypes.number.isRequired,
    scoreChange: PropTypes.number.isRequired,
  })).isRequired,
};

export default ChallengeCompleteDetailScores;
