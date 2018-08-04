import gql from "graphql-tag";

import {
  CourseDataAll,
  ClassroomDataAll,
  MasteryDataAll,
  SubSubjectDataAll,
  SubjectDataAll,
} from "./SimpleFragments";

import {
  SurveyForUserDetails,
} from "./SurveyFragments";

export const CourseForUserDetails = gql`
  fragment CourseForUserDetails on Course {
    ...CourseDataAll
    classrooms {
      ...ClassroomDataAll
      teachers {
        id
        fname
        lname
        honorific
      }
    }
    masteries(orderBy: createdAt_ASC) {
      ...MasteryDataAll
      subSubject {
        ...SubSubjectDataAll
        parent {
          ...SubjectDataAll
        }
      }
    }
    surveys {
      ...SurveyForUserDetails
    }
  }
  ${CourseDataAll}
  ${ClassroomDataAll}
  ${MasteryDataAll}
  ${SubSubjectDataAll}
  ${SubjectDataAll}
  ${SurveyForUserDetails}
`;
