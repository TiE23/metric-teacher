import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { Container, Header, Icon } from "semantic-ui-react";
import sortBy from "lodash/sortBy";

import QueryHandler from "../QueryHandler";
import ScrollToTopOnMount from "../misc/ScrollToTopOnMount";
import SubjectsList from "./SubjectsList";
import SubjectsPageDescription from "./SubjectsPageDescription";

import {
  PAGE_TITLE_HEADER_SIZE,
  PAGE_ICON_COLOR_SUBJECTS,
} from "../../constants";
import {
  SUBJECT_DETAILS_QUERY,
  SUBJECT_AND_MASTERY_DETAILS_QUERY,
} from "../../graphql/Queries";

const Subjects = (props) => {
  const query = props.studentId ?
    SUBJECT_AND_MASTERY_DETAILS_QUERY : SUBJECT_DETAILS_QUERY;

  return (
    <Query
      query={query}
      variables={{ studentid: props.studentId }}  // This is ignored for Subject-only query.
    >
      {queryProps => (
        <QueryHandler
          queryData={queryProps}
        >
          <Container text>
            <ScrollToTopOnMount />
            <Header size={PAGE_TITLE_HEADER_SIZE} textAlign="center">
              <Header.Content>
                <Icon name="tasks" color={PAGE_ICON_COLOR_SUBJECTS} />
                Subjects
                <Header.Subheader>
                  See what you can learn next.
                </Header.Subheader>
              </Header.Content>
            </Header>
            <SubjectsPageDescription />
            <br />
            <SubjectsList
              subjectsData={queryProps.data && sortBy(queryProps.data.allSubjects, "index")}
              masteriesData={queryProps.data && queryProps.data.activeMasteries}
              queryInfo={{ query, variables: queryProps.variables }}
              compactView={false}
              accordionProps={{ fluid: true }}
            />
          </Container>
        </QueryHandler>
      )}
    </Query>
  );
};

Subjects.propTypes = {
  studentId: PropTypes.string,
};

Subjects.defaultProps = {
  studentId: null,
};

export default Subjects;
