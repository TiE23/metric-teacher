import React from "react";
import { Switch, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withAuth from "./components/AuthHOC";
import LoadingError from "./components/LoadingError";

import Welcome from "./components/Welcome";
import Login from "./components/Login";
import User from "./components/user/User";
import Test from "./components/Test";


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={withAuth(Welcome)} />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/user/:id" component={withAuth(User, { private: true })} />
      {/* Below are test paths for development... */}
      <Route exact path="/private" component={withAuth(Test, { private: true })} />
      <Route
        exact
        path="/adminOnly"
        component={
          withAuth(Test, {
            private: true,
            permissions: { type: 3 },
          })
        }
      />
      <Route
        path="*"
        render={() => (
          <LoadingError
            error
            errorHeader="404"
            errorMessage="Page Not Found"
          />
        )}
      />
    </Switch>
  </div>
);

export default App;
