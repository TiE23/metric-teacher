import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { compose } from "react-apollo";

import SignupLoginButtons from "../misc/SignupLoginButtons";

import withAuth from "../AuthHOC";

const SubjectsPageDescription = props => (
  props.userTokenData && props.userTokenData.id ?
    <Container>
      <p>
        Browse available <b>subjects</b> below and assign new <b>sub-subjects</b> that are
        marked as <i>&quot;Not Assigned&quot;</i> to your course load. We strongly recommend
        you assign both &quot;To Metric&quot; and &quot;From Metric&quot; for each sub-subject.
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
        <SignupLoginButtons from={props.location} />
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
    id: PropTypes.string.isRequired,
  }),
};

SubjectsPageDescription.defaultProps = {
  userTokenData: null,
};

export default compose(
  withRouter,
  withAuth,
)(SubjectsPageDescription);
