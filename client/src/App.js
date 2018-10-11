import React from "react";
import { Switch, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withAuth from "./components/AuthHOC";

import Test from "./components/Test";
import Welcome from "./components/Welcome";
import MenuFrame from "./components/main/MenuFrame";
import ChallengePage from "./components/challenge/ChallengePage";
import Login from "./components/entry/Login";
import Logout from "./components/entry/Logout";
import UserPage from "./components/user/UserPage";
import SubjectsPage from "./components/subject/SubjectsPage";
import DocumentationPage from "./components/documentation/DocumentationPage";
import QaViewerPage from "./components/qa/QaViewerPage";
import QuestionViewerPage from "./components/question/QuestionViewerPage";
import QuestionSubmissionPage from "./components/question/QuestionSubmissionPage";
import AdminToolsPage from "./components/admin/AdminToolsPage";
import UserSearchPage from "./components/admin/user/UserSearchPage";
import QuestionSearchPage from "./components/admin/question/QuestionSearchPage";
import NotFoundPage from "./components/misc/NotFoundPage";

import {
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
} from "./constants";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" component={withAuth(Welcome)} />
      <Route exact path="/login" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/signup" component={withAuth(Login, { props: { loginPath: "/login" } })} />
      <Route exact path="/logout" component={Logout} />
      <Route path="/">
        <MenuFrame>
          <Route exact path="/user/:id" component={withAuth(UserPage, { private: true })} />
          <Route exact path="/subjects" component={withAuth(SubjectsPage)} />
          <Route exact path="/docs" component={DocumentationPage} />
          <Route
            exact
            path="/challenge/:mode?/:challengeId?"
            component={withAuth(ChallengePage, { private: true })}
          />
          {/* Admin Pages */}
          <Route
            exact
            path="/admin"
            component={
              withAuth(AdminToolsPage, {
                private: true,
                permissions: { type: USER_TYPE_ADMIN },
              })
            }
          />
          <Route
            exact
            path="/admin/questionsearch"
            component={
              withAuth(QuestionSearchPage, {
                private: true,
                permissions: { type: USER_TYPE_MODERATOR },
              })
            }
          />
          <Route
            exact
            path="/admin/usersearch"
            component={
              withAuth(UserSearchPage, {
                private: true,
                permissions: { type: USER_TYPE_MODERATOR },
              })
            }
          />
          <Route
            exact
            path="/submitquestion"
            component={
              withAuth(QuestionSubmissionPage, {
                private: true,
              })
            }
          />
          {/* Below are test paths for development... */}
          <Route exact path="/test" component={withAuth(Test, { private: true })} />
          <Route exact path="/qaviewer/:questionId" component={withAuth(QaViewerPage, { private: true })} />
          <Route
            exact
            path="/questionviewer/:questionId"
            component={withAuth(QuestionViewerPage, { private: true })}
          />
          {/* This is the 404 Page */}
          <Route path="*" component={NotFoundPage} />
        </MenuFrame>
      </Route>
    </Switch>
  </div>
);

export default App;
