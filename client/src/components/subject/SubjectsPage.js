import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import Subjects from "./Subjects";

import {
  USER_TYPE_STUDENT,
} from "../../constants";

const SubjectsPage = props => (
  <Subjects
    studentId={props.userTokenData && props.userTokenData.type === USER_TYPE_STUDENT ?
      props.userTokenData.id : null}
  />
);

SubjectsPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  userTokenData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.number.isRequired,
  }),
};

SubjectsPage.defaultProps = {
  userTokenData: null,
};

export default withRouter(SubjectsPage);
