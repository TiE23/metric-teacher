import React from "react";
import { withRouter } from "react-router";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Welcome = () => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <p>Welcome!</p>
      </Header.Content>
    </Header>
    <Link to="/login">Login</Link>
    <br />
    <Link to="/signup">Signup</Link>
    <br />
    <Link to="/user/me">My details</Link>
  </div>
);

export default withRouter(Welcome);
