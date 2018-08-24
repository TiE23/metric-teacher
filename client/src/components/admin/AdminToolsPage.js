import React from "react";
import { Segment, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import FloatingCenterGrid from "../FloatingCenterGrid";

const AdminToolsPage = () => (
  <FloatingCenterGrid>
    <Segment>
      <List divided relaxed>
        <List.Item
          icon="search"
          content={<Link to="/admin/questionsearch">Question Browser</Link>}
        />
        <List.Item
          icon="plus"
          content={<Link to="/submitquestion">Question Creator</Link>}
        />
      </List>
    </Segment>
  </FloatingCenterGrid>
);

export default AdminToolsPage;
