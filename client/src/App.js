import React from "react";
import { Switch, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withUser from "./components/UserProtector";
import Welcome from "./components/Welcome";
import Login from "./components/Login";


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={withUser(Welcome)} />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" component={withUser(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withUser(Login, { props: { loginPath: "/login" } })} />
    </Switch>
  </div>
);

export default App;
