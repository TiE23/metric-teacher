import React from "react";
import PropTypes from "prop-types";
import { Input, Grid } from "semantic-ui-react";

import utils from "../../../../../utils";

const ChallengeConversionDirect = (props) => {
  const handleInputUpdate = (e, { value }) => {
    const val = utils.decimalHelper(value); // Typing a "." will automatically fill to "0."
    if (((val && utils.isDecimalTyped(val)) || !val)) {
      props.updateCurrentChallengeData({ inputData: val }); // This is a string.
    }
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Input
            label={{ content: utils.unitInitilizer(props.inputUnit) }}
            labelPosition="right"
            value={props.inputtedAnswer || ""}
            onChange={handleInputUpdate}
            placeholder="Enter answer..."
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

ChallengeConversionDirect.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  inputUnit: PropTypes.string.isRequired,
  inputtedAnswer: PropTypes.string,
};

ChallengeConversionDirect.defaultProps = {
  inputtedAnswer: null,
};

export default ChallengeConversionDirect;
