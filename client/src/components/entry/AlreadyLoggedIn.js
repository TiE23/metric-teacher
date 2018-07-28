import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Message, Button, Container } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";

const AlreadyLoggedIn = props => (
  <FloatingCenterGrid>
    <Message>
      <Message.Header>
        Welcome Back!
      </Message.Header>
      <Message.Content>
        <p>
          You&#39;re already logged in. You can log out now or you can stay logged in.
        </p>
        <Container textAlign="right">
          <Button
            color="orange"
            onClick={() => props.history.push("/logout", { from: props.location })}
          >
            Log Out Now
          </Button>
          <Button
            primary
            onClick={() => props.history.goBack()}
          >
            Stay Logged In
          </Button>
        </Container>
      </Message.Content>
    </Message>
  </FloatingCenterGrid>
);

AlreadyLoggedIn.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(AlreadyLoggedIn);
