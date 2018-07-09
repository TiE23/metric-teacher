import React from "react";
import { Switch, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withUser from "./components/UserProtector";
import LoadingError from "./components/LoadingError";

import Welcome from "./components/Welcome";
import Login from "./components/Login";
import User from "./components/user/User";


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={withUser(Welcome)} />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" component={withUser(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withUser(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/user/:id" component={withUser(User, { private: true })} />
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
