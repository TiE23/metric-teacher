import React from "react";
import { Switch, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withAuth from "./components/AuthHOC";
import LoadingError from "./components/LoadingError";

import Welcome from "./components/Welcome";
import Login from "./components/entry/Login";
import Logout from "./components/entry/Logout";
import User from "./components/user/UserPage";
import Subjects from "./components/subject/SubjectsPage";
import Test from "./components/Test";
import QaViewerPage from "./components/qa/QaViewerPage";
import QuestionViewerPage from "./components/question/QuestionViewerPage";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={Welcome} />
      {/* TODO The loginPath prop here is a little hacky, consider a better solution... */}
      <Route exact path="/login" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/user/:id" component={withAuth(User, { private: true })} />
      <Route exact path="/subjects" component={withAuth(Subjects)} />
      {/* Below are test paths for development... */}
      <Route exact path="/qaviewer/:questionId" component={withAuth(QaViewerPage, { private: true })} />
      <Route
        exact
        path="/questionviewer/:questionId"
        component={withAuth(QuestionViewerPage, { private: true })}
      />
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
      {/* This is the 404 Page */}
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
