import React from "react";
import PropTypes from "prop-types";

import {
  QA_DATA_EVERYTHING,
} from "../../../propTypes";


const ChallengeMain = (props) => {
  const skipQa = () => props.resolveCurrentQA("skip");

  return (
    <div>
      <p>ChallengeMain - Temp Segment</p>
      <button onClick={skipQa}>Skip</button>
      <pre>
        {JSON.stringify(props.qaData, null, 2)}
      </pre>
    </div>
  );
};

ChallengeMain.propTypes = {
  qaData: QA_DATA_EVERYTHING.isRequired,
  resolveCurrentQA: PropTypes.func.isRequired,
};

export default ChallengeMain;
