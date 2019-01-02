/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";

import {
  SITE_NAME,
} from "../../../constants";

export default (
  <React.Fragment>
    <p>
      I know this website is only the beginning for me. If you're reading this wondering if I might make a great new member of your team I really appreciate you taking the time to look at my work. I am excessively excited to see what I can do in a professional environment and am looking forward to working with you.
    </p>

    <p>
      <i>P.S. You can visit the <Link to="/credits">credits page</Link> to learn about Paul, the freelance artist who helped me bring a splash of color and personality to {SITE_NAME}.</i>
    </p>
  </React.Fragment>
);
