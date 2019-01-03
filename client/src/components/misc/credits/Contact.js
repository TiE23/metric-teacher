/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      You can e-mail us at <a href="mailto:metricteachersite@gmail.com">metricteachersite@gmail.com</a> for comments, suggestions, questions, or help with your account such as password resets.
    </p>

    <p>
      {SITE_NAME} is also on Twitter! <XLink to="https://twitter.com/MetricTeacher">@MetricTeacher</XLink>
    </p>
  </React.Fragment>
);
