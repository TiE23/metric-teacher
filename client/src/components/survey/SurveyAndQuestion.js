import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import QueryHandler from "../QueryHandler";
import Survey from "./Survey";
import QaReview from "../qa/QaReview";

import {
  GET_QA_QUESTIONS_WITH_STUDENT,
} from "../../graphql/Queries";

const SurveyAndQuestion = props => (
  <div>
    {props.opened &&
      <Query
        query={GET_QA_QUESTIONS_WITH_STUDENT}
        variables={{
          questionids: [props.questionData.id],
          studentid: props.queryInfo.variables.studentid || props.queryInfo.variables.userid,
        }}
        fetchPolicy="network-only"
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
            noDataErrorMessage="No QA object returned."
          >
            <QaReview
              qaData={queryProps.data && queryProps.data.getQa && queryProps.data.getQa[0]}
              allowSurveyEditor
            />
          </QueryHandler>
        )}
      </Query>
    }
    {props.surveyData &&
    <Survey
      surveyData={props.surveyData}
      queryInfo={props.queryInfo}
    />
    }
  </div>
);

SurveyAndQuestion.propTypes = {
  questionData: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  surveyData: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  queryInfo: PropTypes.shape({
    variables: PropTypes.shape({
      studentid: PropTypes.string,
      userid: PropTypes.string,
    }).isRequired,
  }),
  opened: PropTypes.bool,
};

SurveyAndQuestion.defaultProps = {
  questionData: null,
  surveyData: null,
  queryInfo: null,
  opened: false,
};

export default SurveyAndQuestion;
