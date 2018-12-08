import React from "react";
import { Container, Header, Icon, List, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_ADMIN,
} from "../../constants";

const AdminToolsPage = () => (
  <Segment as={Container} text>
    <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
      <Icon name="cog" color={PAGE_ICON_COLOR_ADMIN} />
      Admin Tools
    </Header>

    <List divided relaxed>
      <List.Item
        icon="users"
        content={<Link to="/admin/usersearch">User Browser</Link>}
      />
      <List.Item
        icon="search"
        content={<Link to="/admin/questionsearch">Question Browser</Link>}
      />
      <List.Item
        icon="plus"
        content={<Link to="/tools/questioncreator">Question Creator</Link>}
      />
      <List.Item
        icon="cog"
        content={<Link to="/tools">Community Tools Page</Link>}
      />
    </List>
  </Segment>
);

export default AdminToolsPage;
