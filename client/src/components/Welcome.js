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
    <br />
    <Link to="/private">Private Test</Link>
    <br />
    <Link to="/adminOnly">Admin Only</Link>
    <br />
    <Link to="/user/cjiz30cd400jb0721gz677i1z">A student</Link>
  </div>
);

export default withRouter(Welcome);
