import React from "react";
import { Divider } from "semantic-ui-react";

import {
  SITE_NAME,
} from "../../constants";

const FrameFooter = () => (
  <Divider horizontal>
    © 2018 - {new Date().getFullYear()} {SITE_NAME}
  </Divider>
);

export default FrameFooter;
