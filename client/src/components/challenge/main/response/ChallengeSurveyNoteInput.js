import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Input } from "semantic-ui-react";

class ChallengeSurveyNoteInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.updateNote = (e, { value }) => {
      this.props.updateCurrentChallengeData({ inputData: { detail: value } });
    };
  }

  render() {
    return (
      <div>
        <p>ChallengeSurveyNoteInput</p>
        <Input
          value={this.props.surveyNote || ""}
          onChange={this.updateNote}
        />
        {!!this.props.noteRequired && <p>Note Required</p>}
      </div>
    );
  }
}

ChallengeSurveyNoteInput.propTypes = {
  updateCurrentChallengeData: PropTypes.func.isRequired,
  noteRequired: PropTypes.bool.isRequired,
  surveyNote: PropTypes.string,
};

ChallengeSurveyNoteInput.defaultProps = {
  surveyNote: null,
};

export default ChallengeSurveyNoteInput;
