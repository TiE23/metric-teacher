import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import Welcome from "./components/Welcome";
import Login from "./components/Login";


const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/welcome" />} />
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/login" render={() => <Login loginPath="/login" />} />
      <Route exact path="/signup" render={() => <Login loginPath="/login" />} />
    </Switch>
  </div>
);

export default App;
