import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "semantic-ui-react";

import {
  SURVEY_STATUS_NORMAL,
  SURVEY_MAX_SCORE,
} from "../../constants";

import SurveyAndQuestion from "./SurveyAndQuestion";

const SurveysList = (props) => {
  const { surveysData } = props;

  const surveyPanels = surveysData.map((surveyData) => {
    const title = `${surveyData.question.id} - ${(surveyData.score / SURVEY_MAX_SCORE) * 100}% Mastered${surveyData.status === SURVEY_STATUS_NORMAL ? "" : " - Skipped"}`;

    return ({
      key: surveyData.id,
      title,
      content: {
        content: (
          <SurveyAndQuestion
            questionData={surveyData.question}
            surveyData={surveyData}
            queryInfo={props.queryInfo}
          />
        ),
        key: surveyData.id,
      },
    });
  });

  return (
    <Accordion
      defaultActiveIndex={props.defaultActiveIndex}
      panels={surveyPanels}
      styled
      {...props.accordionProps}
    />
  );
};

SurveysList.propTypes = {
  surveysData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    question: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  queryInfo: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
  defaultActiveIndex: PropTypes.number,
  accordionProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

SurveysList.defaultProps = {
  queryInfo: null,
  defaultActiveIndex: -1,
  accordionProps: null,
};

export default SurveysList;
