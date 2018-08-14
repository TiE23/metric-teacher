import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import deline from "deline";

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
        buttonText="Switch Preference"
        loading={loading}
        error={error}
        buttonProps={props.buttonProps}
        confirmModal
        modalProps={{ basic: true }}
        modalHeaderContent={`Switch to ${props.courseFlags & COURSE_FLAG_PREFER_METRIC ?
          "Imperial" : "Metric"}?`}
        modalContent={deline`Switching this will change what surveys you are asked. For example,
          if you prefer Imperial, a survey asking you for your height will ask for your answer in
          feet and inches. On the other hand, if you prefer Metric, it'll instead ask for your
          answer in centimeters. This is the only difference - how often you are asked to convert
          to or from your preferred system is not affected.`}
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
