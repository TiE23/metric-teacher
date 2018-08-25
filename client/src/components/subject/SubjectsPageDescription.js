import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { compose } from "react-apollo";

import withAuth from "../AuthHOC";

const SubjectsPageDescription = props => (
  props.userTokenData && props.userTokenData.id ?
    <Container>
      <p>
        Browse available <b>subjects</b> below and assign new <b>sub-subjects</b> that are
        marked as <i>&quot;Not Assigned&quot;</i> to your course load.
      </p>
      <p>
        View your current course load in <Link to="/user/me">your profile.</Link>
      </p>
    </Container>
    :
    <Container>
      <p>
        Below you&apos;ll find the full list of all <b>subjects</b> offered on this
        website.
      </p>
      <p>
        Under each subject you&apos;ll find a list of <b>sub-subjects</b> that you can
        add to your course load and start learning right away!
      </p>
      <p>
        Each sub-subject is divided into different scales and whether or not it&apos;ll
        teach you to not just simply convert, but <i>think</i> in a new system of units!
      </p>
      <p>
        Have fun and start learning right away with a free student account!
      </p>
      <Container textAlign="center">
        <Button.Group>
          <Button
            color="olive"
            onClick={() => props.history.push("/login", { from: props.location })}
          >
            Login
          </Button>
          <Button.Or />
          <Button
            primary
            onClick={() => props.history.push("/signup", { from: props.location })}
          >
            Sign Up
          </Button>
        </Button.Group>
      </Container>
    </Container>
);

SubjectsPageDescription.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

SubjectsPageDescription.defaultProps = {
  userTokenData: null,
};

export default compose(
  withRouter,
  withAuth,
)(SubjectsPageDescription);
