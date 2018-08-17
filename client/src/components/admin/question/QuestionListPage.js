import React, { PureComponent } from "react";
import { Query } from "react-apollo";

import {
  QUESTION_SEARCH,
} from "../../../graphql/Queries";

import QueryHandler from "../../QueryHandler";

/**
 * This will get Search options. For now, during development, it just shows a hardcoded search.
 */
class QuestionListPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      questionSearchWhere: {  // HARD-CODED FOR NOW!
        parent: {
          parent: {
            name: "Length",
          },
          toMetric: true,
        },
      },
    };
  }

  render() {
    return (
      <Query
        query={QUESTION_SEARCH}
        variables={{ where: this.state.questionSearchWhere }}
      >
        {queryProps => (
          <QueryHandler
            queryData={queryProps}
          >
            <p>QuestionListPage</p>
          </QueryHandler>
        )}
      </Query>
    );
  }
}

export default QuestionListPage;
