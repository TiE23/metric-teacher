import React from "react";
import { Container, Header, Icon, List, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_ADMIN,
} from "../../constants";

const ToolsPage = () => (
  <Segment as={Container} text>
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="cog" color={PAGE_ICON_COLOR_ADMIN} />
      Community Tools
    </Header>

    <List divided relaxed>
      <List.Item
        icon="plus"
        content={<Link to="/tools/submitquestion">Question Creator</Link>}
      />
    </List>
  </Segment>
);

export default ToolsPage;
