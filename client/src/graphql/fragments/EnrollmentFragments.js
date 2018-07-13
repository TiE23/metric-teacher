import gql from "graphql-tag";

import {
  EnrollmentDataAll,
} from "./SimpleFragments";

import {
  CourseForUserDetails,
} from "./CourseFragments";

// Gets just the first active course.
export const EnrollmentForUserDetails = gql`
  fragment EnrollmentForUserDetails on Enrollment {
    ...EnrollmentDataAll
    courses (where: { status: 0 }, first: 1) {
      ...CourseForUserDetails
    }
  }
  ${EnrollmentDataAll}
  ${CourseForUserDetails}
`;
