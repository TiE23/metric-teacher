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
    <Link to="/logout">Logout</Link>
    <br />
    <Link to="/user/me">My details</Link>
    <br />
    <Link to="/subjects">Subjects</Link>
    <br />
    <Link to="/private">Private Test</Link>
    <br />
    <Link to="/adminOnly">Admin Only</Link>
    <br />
    <Link to="/user/cjk1pagik004a0793ur0ov3bq">A student</Link>
    <br />
    <Link to="/qaviewer/cjk1paglb00540793kpqchouw">A written QA</Link>
    <br />
    <Link to="/qaviewer/cjk1pago700680793uvc6i2a2">A conversion QA</Link>
    <br />
    <Link to="/qaviewer/cjk1pagpd006o0793yws3ys7n">A survey QA</Link>
    <br />
    <Link to="/questionviewer/cjk1paglb00540793kpqchouw">A written question</Link>
    <br />
    <Link to="/questionviewer/cjk1pagrj007k07933cf9py49">A written question (answer detail)</Link>
    <br />
    <Link to="/questionviewer/cjk1pago700680793uvc6i2a2">A conversion question</Link>
    <br />
    <Link to="/questionviewer/cjk1pagpd006o0793yws3ys7n">A survey question</Link>
    <br />
    <Link to="/questionviewer/cjk1pagpx006w0793joov79gp">A survey question (flag 1)</Link>
    <br />
    <Link to="/questionviewer/cjk1pagq800700793jwuow8zp">A survey question (flag 2)</Link>
  </div>
);

export default withRouter(Welcome);
