import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  SURVEY_UPDATE_STATUS_MUTATION,
} from "../../graphql/Mutations";

import {
  SURVEY_STATUS_NORMAL,
  SURVEY_STATUS_SKIPPED,
} from "../../constants";

const SurveyToggle = props => (
  <Mutation
    mutation={SURVEY_UPDATE_STATUS_MUTATION}
    update={(cache, { data: { updateSurveyStatus } }) => {
      const data = cache.readQuery(props.queryInfo);
      utils.cacheUpdateObject(data, props.surveyId, updateSurveyStatus);
      cache.writeQuery({
        ...props.queryInfo,
        data,
      });
    }}
  >
    {(updateSurveyStatus, { loading, error }) => (
      <LoadingButton
        onClick={() => updateSurveyStatus({
          variables: {
            surveyid: props.surveyId,
            status: props.surveyCurrentStatus === SURVEY_STATUS_NORMAL ?
              SURVEY_STATUS_SKIPPED : SURVEY_STATUS_NORMAL,
          },
        })}
        loading={loading}
        error={error}
        buttonText={props.surveyCurrentStatus === SURVEY_STATUS_NORMAL ? "Skip" : "Use"}
        buttonProps={{
          primary: props.surveyCurrentStatus === SURVEY_STATUS_SKIPPED,
          ...props.buttonProps,
        }}
      />
    )}
  </Mutation>
);

SurveyToggle.propTypes = {
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  surveyId: PropTypes.string.isRequired,
  surveyCurrentStatus: PropTypes.number.isRequired,
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

SurveyToggle.defaultProps = {
  buttonProps: null,
};

export default SurveyToggle;
