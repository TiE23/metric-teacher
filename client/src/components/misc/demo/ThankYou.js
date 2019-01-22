/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

import XLink from "../ExternalLink";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      This website is only the beginning. If you're reading this wondering if I might make a great addition to your team I really appreciate you taking the time to look at my work. I am excessively excited to see what I can do in a professional environment. I look forward to hearing back from you!
    </p>

    <p>
      Find me on <XLink to="https://github.com/TiE23">GitHub</XLink>, <XLink to="https://www.linkedin.com/in/kyle-m-geib/">LinkedIn</XLink>, and <XLink to="https://flickr.com/kg-23">Flickr</XLink>. You can also view my <XLink to="https://s3-us-west-2.amazonaws.com/metric-teacher/other/Kyle_Geib_Resume.pdf">current résumé</XLink>.
    </p>

    <p>
      <i>P.S. You can visit the <Link to="/credits">credits page</Link> to learn about Paul, the freelance artist who helped me bring a splash of color and personality to {SITE_NAME}.</i>
    </p>

    <p>
      <i>P.P.S. You can go to the <Link to="/">main page</Link> to see how {SITE_NAME} looks to the regular visitor.</i>
    </p>
  </React.Fragment>
);
