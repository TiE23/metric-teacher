import React from "react";
import { Divider } from "semantic-ui-react";

import {
  SITE_NAME,
} from "../../constants";

const FrameFooter = () => (
  <Divider horizontal>
    {SITE_NAME} © {new Date().getFullYear()}
  </Divider>
);

export default FrameFooter;
