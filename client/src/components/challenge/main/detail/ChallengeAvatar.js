import React from "react";
import PropTypes from "prop-types";
import { Header, Image } from "semantic-ui-react";

import {
  QUESTION_TYPE_NAMES,
} from "../../../../constants";


const ChallengeAvatar = props => (
  <div>
    <Image src="/img/challenge/mascot-temp.gif" fluid circular centered />
    <Header sub textAlign="center">
      {QUESTION_TYPE_NAMES[props.questionType]} Question
    </Header>
  </div>
);

ChallengeAvatar.propTypes = {
  questionType: PropTypes.number.isRequired,
};

export default ChallengeAvatar;
