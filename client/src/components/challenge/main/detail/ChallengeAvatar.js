import React from "react";
import PropTypes from "prop-types";
import { Image } from "semantic-ui-react";


const ChallengeAvatar = () => (
  <Image src="/img/challenge/mascot-temp.gif" fluid circular centered />
);

// TODO - Use questionType to determine the avatar design
ChallengeAvatar.propTypes = {
  questionType: PropTypes.number.isRequired,
};

export default ChallengeAvatar;
