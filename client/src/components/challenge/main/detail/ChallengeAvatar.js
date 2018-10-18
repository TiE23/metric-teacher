import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";

import {
  CHALLENGE_IMAGES_MODE,
} from "../../../../constants";

const ChallengeAvatar = props => (
  <Image
    src={`/img/${CHALLENGE_IMAGES_MODE[props.questionType]}`}
    fluid
    circular
    centered
  />
);

ChallengeAvatar.propTypes = {
  questionType: PropTypes.number.isRequired,
};

export default ChallengeAvatar;
