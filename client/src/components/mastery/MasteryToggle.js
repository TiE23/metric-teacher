import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  MASTERY_UPDATE_STATUS_MUTATION,
} from "../../graphql/Mutations";

import {
  MASTERY_STATUS_ACTIVE,
  MASTERY_STATUS_INACTIVE,
} from "../../constants";

const MasteryToggle = props => (
  <Mutation
    mutation={MASTERY_UPDATE_STATUS_MUTATION}
    update={(cache, { data: { updateMasteryStatus } }) => {
      const data = cache.readQuery(props.queryInfo);
      utils.cacheUpdateObject(data, props.masteryId, updateMasteryStatus);
      cache.writeQuery({
        ...props.queryInfo,
        data,
      });
    }}
  >
    {(updateMasteryStatus, { loading, error }) => (
      <LoadingButton
        onClick={() => updateMasteryStatus({
          variables: {
            masteryid: props.masteryId,
            status: props.masteryCurrentStatus === MASTERY_STATUS_ACTIVE ?
              MASTERY_STATUS_INACTIVE : MASTERY_STATUS_ACTIVE,
          },
        })}
        loading={loading}
        error={error}
        buttonText={props.masteryCurrentStatus === MASTERY_STATUS_ACTIVE ? "Disable" : "Enable"}
      />
    )}
  </Mutation>
);

MasteryToggle.propTypes = {
  queryInfo: PropTypes.shape({
    query: PropTypes.object.isRequired,
    variables: PropTypes.object.isRequired,
  }).isRequired,
  masteryId: PropTypes.string.isRequired,
  masteryCurrentStatus: PropTypes.number.isRequired,
};

export default MasteryToggle;
