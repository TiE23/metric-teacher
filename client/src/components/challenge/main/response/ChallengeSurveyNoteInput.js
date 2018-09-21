import React from "react";
import PropTypes from "prop-types";
import { Icon, Input, Label, Segment } from "semantic-ui-react";

import {
  SURVEY_DETAIL_MAXIMUM_LENGTH,
} from "../../../../constants";

const ChallengeSurveyNoteInput = (props) => {
  const updateNote = (e, { value }) => {
    if (value.length <= SURVEY_DETAIL_MAXIMUM_LENGTH) {
      props.updateCurrentChallengeData({ inputData: { detail: value } });
    }
  };

  return (
    <Segment>
      <Label
        attached="top left"
        color={props.noteRequired ? "orange" : "olive"}
      >
        <Icon name="clipboard check" />
        Custom Note ({props.noteRequired ? "Required" : "Optional"})
      </Label>
      <Input
        fluid
        value={props.surveyNote || ""}
        onChange={updateNote}
        placeholder={props.placeholder}
      />
    </Segment>
  );
};

ChallengeSurveyNoteInput.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  noteRequired: PropTypes.bool.isRequired,
  surveyNote: PropTypes.string,
  placeholder: PropTypes.string,
};

ChallengeSurveyNoteInput.defaultProps = {
  surveyNote: null,
  placeholder: "",
};

export default ChallengeSurveyNoteInput;
