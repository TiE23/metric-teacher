/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
  SITE_EMAIL_ADMIN,
  SITE_TWITTER_ACCOUNT,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      You can e-mail us at <a href={`mailto:${SITE_EMAIL_ADMIN}`}>{SITE_EMAIL_ADMIN}</a> for comments, suggestions, questions, or help with your account such as password resets.
    </p>

    <p>
      {SITE_NAME} is also on Twitter! <XLink to={`https://twitter.com/${SITE_TWITTER_ACCOUNT}`}>@{SITE_TWITTER_ACCOUNT}</XLink>
    </p>
  </React.Fragment>
);
