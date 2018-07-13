import { ApolloClient, split, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./semantic/dist/semantic.min.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import utils from "./utils";
import API_ROOT from "./api-config";

// Grab the token from local storage. customFetch() might re-write it, so we use 'let'.
let token = utils.readTokenLocalStorage();  // eslint-disable-line prefer-const

/**
 * Providing a custom fetch function for createHttpLink(). What's different about this is that
 * essentially allows the client to re-try after a failed request by checking the local storage
 * a second time for the token (through a utility function). This is necessary because if a user
 * logs in for the first time it'll attempt all future actions with no token until the page is
 * reloaded and this index.js file is executed again.
 * Idea taken from:
 * https://blog.beeaweso.me/refreshing-token-based-authentication-with-apollo-client-2-0-7d45c20dc703
 * and
 * https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#custom-fetching
 * @param uri
 * @param options
 * @returns {Promise<string>}
 */
const customFetch = (uri, options) => {
  // Fire off the initial fetch and see if it worked.
  const initialRequest = fetch(uri, options); // eslint-disable-line no-undef

  return initialRequest.then(response => (
    response.text()
  )).then((text) => {
    const jsonified = JSON.parse(text);

    // If there was an error we need to attempt to handle it...
    if (jsonified.errors && jsonified.errors.findIndex(error =>
      error.message.includes("Not authorized")) !== -1
    ) {
      // Attempt to re-grab the token from local storage
      this.token = utils.readTokenLocalStorage();

      // Don't attempt fetch again if there was no token.
      if (this.token) {
        // Load it into the authorization header
        const updatedOptions = options;
        updatedOptions.headers.authorization = `Bearer ${this.token}`;

        // Fire off the fetch a second time and hope it works.
        return fetch(uri, updatedOptions);  // eslint-disable-line no-undef
      }
    }

    const result = {};
    result.ok = true; // TODO Should this be false in the case of a failure to regrab a token???
    result.text = () => new Promise((resolve, reject) => {
      resolve(text);
    });
    return result;
  });
};

const httpLinkWithAuthToken = createHttpLink({
  uri: `http://${API_ROOT}`,
  fetch: customFetch,
  headers: {
    authorization: token ? `Bearer ${token}` : null,
  },
});

const wsLink = new WebSocketLink({
  uri: `ws://${API_ROOT}`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuthToken,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id,
  }),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  // eslint-disable-next-line no-undef
  , document.getElementById("root"),
);
registerServiceWorker();
