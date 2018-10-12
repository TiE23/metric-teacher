import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

import {
  USER_TYPE_ADMIN,
} from "../constants";

const Welcome = props => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <p>Welcome!</p>
      </Header.Content>
    </Header>
    {props.userTokenData && props.userTokenData.type === USER_TYPE_ADMIN &&
    <span>
      <Link to="/admin">Admin Tools</Link>
      <br />
    </span>
    }
    {!props.userTokenData &&
    <span>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      <br />
    </span>
    }
    {props.userTokenData &&
    <span>
      <Link to="/logout">Logout</Link>
      <br />
    </span>
    }
    <Link to="/user/me">My details</Link>
    <br />
    <Link to="/subjects">Subjects</Link>
    <br />
    <Link to="/docs">Docs</Link>
    <br />
    <Link to="/test">Test</Link>
    <br />
    <Link to="/user/cjk1paghy0044079340rau9er">Student001</Link>
    <br />
    <Link to="/user/cjk1pagik004a0793ur0ov3bq">Student003</Link>
    <br />
    <Link to="/challenge">Challenge</Link>
    <br />
    <Link to="/challenge/kickoff">Challenge Kickoff</Link>
  </div>
);

Welcome.propTypes = {
  userTokenData: PropTypes.shape({
    type: PropTypes.number.isRequired,
  }),
};

Welcome.defaultProps = {
  userTokenData: null,
};

export default withRouter(Welcome);
