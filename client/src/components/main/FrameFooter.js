import React from "react";
import { Divider } from "semantic-ui-react";

import {
  SITE_NAME,
} from "../../constants";

const FrameFooter = () => (
  <Divider horizontal>
    {SITE_NAME} 2018
  </Divider>
);

export default FrameFooter;
