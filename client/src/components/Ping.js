import React, { Component } from "react";
import { Query, withApollo, compose } from "react-apollo";

import utils from "../utils";

import { PING_QUERY } from "../graphql/Queries";

class Ping extends Component {
  render() {
    return (
      <div>
        <Query query={PING_QUERY}>
          {queryProps => (
            utils.queryOK(queryProps, queryProps.data) ?
              <p>
                Ping: {queryProps.data.ping}
              </p>
              :
              <p>Loading...</p>
          )}
        </Query>
      </div>
    );
  }
}

export default compose(withApollo)(Ping);
