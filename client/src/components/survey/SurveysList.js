import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import utils from "../../utils";

import {
  SURVEY_STATUS_NORMAL,
  SURVEY_MAX_SCORE,
} from "../../constants";

import SurveyAndQuestion from "./SurveyAndQuestion";

class SurveysList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openedPanels: {},
    };
  }

  // Mark a panel opened on the first time it was opened. This'll be used to trigger a query.
  markPanelOpened(index) {
    if (!this.state.openedPanels[index]) {
      const newOpen = {};
      newOpen[index] = true;
      this.setState({
        openedPanels: { ...this.state.openedPanels, ...newOpen },
      });
    }
  }

  render() {
    const { surveysData } = this.props;

    const surveyPanels = surveysData.map((surveyData, index) => {
      const questionText =
        surveyData.question.question.slice(0, surveyData.question.question.indexOf("[")).trim();
      const title = `"${utils.stringTruncator(questionText, 30)}" - ${surveyData.score / (SURVEY_MAX_SCORE / 100)}% Mastered${surveyData.status === SURVEY_STATUS_NORMAL ? "" : " - Skipped"}`;

      return ({
        key: surveyData.id,
        title,
        content: {
          content: (
            <SurveyAndQuestion
              questionData={surveyData.question}
              surveyData={surveyData}
              queryInfo={this.props.queryInfo}
              opened={this.state.openedPanels[index]}
            />
          ),
          key: surveyData.id,
        },
      });
    });

    return (
      <Accordion
        panels={surveyPanels}
        styled
        {...this.props.accordionProps}
        onTitleClick={(e, data) => this.markPanelOpened(data.index)}
      />
    );
  }
};

SurveysList.propTypes = {
  surveysData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  queryInfo: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SurveysList.defaultProps = {
  queryInfo: null,
  accordionProps: null,
};

export default SurveysList;
