import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";

import {
  USER_TYPE_ADMIN,
} from "../../constants";

const Home = props => (
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
    <Link to="/challenge">Challenge</Link>
  </div>
);

Home.propTypes = {
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

Home.defaultProps = {
  userTokenData: null,
};

export default Home;
