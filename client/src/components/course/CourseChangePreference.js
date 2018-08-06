import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";

import utils from "../../utils";

import LoadingButton from "../misc/LoadingButton";

import {
  COURSE_FLAG_PREFER_METRIC,
} from "../../constants";

import {
  COURSE_UPDATE_FLAGS_MUTATION,
} from "../../graphql/Mutations";

const CourseChangePreference = props => (
  <Mutation
    mutation={COURSE_UPDATE_FLAGS_MUTATION}
    update={(cache, { data: { updateCourseFlags } }) => {
      const data = cache.readQuery(props.queryInfo);
      utils.cacheUpdateObject(data, updateCourseFlags.id, updateCourseFlags);
      cache.writeQuery({
        ...props.queryInfo,
        data,
      });
    }}
  >
    {(updateCourseFlags, { loading, error }) => (
      <LoadingButton
        onClick={() => updateCourseFlags({
          variables: {
            courseid: props.courseId,
            flags: props.courseFlags & COURSE_FLAG_PREFER_METRIC ?
              props.courseFlags & ~COURSE_FLAG_PREFER_METRIC :
              props.courseFlags | COURSE_FLAG_PREFER_METRIC,
          },
        })}
        buttonText={`Switch to ${props.courseFlags & COURSE_FLAG_PREFER_METRIC ?
          "Imperial" : "Metric"}`}
        loading={loading}
        error={error}
        buttonProps={props.buttonProps}
        confirmModal
        modalProps={{ basic: true }}
      />
    )}
  </Mutation>
);

CourseChangePreference.propTypes = {
  courseId: PropTypes.string.isRequired,
  courseFlags: PropTypes.number.isRequired,
  queryInfo: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  buttonProps: PropTypes.object,  // eslint-disable-line react/forbid-prop-types
};

CourseChangePreference.defaultProps = {
  buttonProps: null,
};

export default CourseChangePreference;
