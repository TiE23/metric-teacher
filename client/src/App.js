import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import "./semantic/dist/semantic.min.css";

import withAuth from "./components/AuthHOC";

import Welcome from "./components/landing/Welcome";
import Home from "./components/landing/Home";
import Credits from "./components/misc/CreditsPage";
import MenuFrame from "./components/main/MenuFrame";
import ChallengePage from "./components/challenge/ChallengePage";
import Login from "./components/entry/Login";
import Logout from "./components/entry/Logout";
import UserPage from "./components/user/UserPage";
import SubjectsPage from "./components/subject/SubjectsPage";
import DocumentationPage from "./components/documentation/DocumentationPage";
import QaViewerPage from "./components/qa/QaViewerPage";
import QuestionViewerPage from "./components/tools/question/QuestionViewerPage";
import QuestionCreatorPage from "./components/tools/question/QuestionCreatorPage";
import AdminToolsPage from "./components/admin/AdminToolsPage";
import ToolsPage from "./components/tools/ToolsPage";
import UserListPage from "./components/tools/user/UserListPage";
import QuestionListPage from "./components/tools/question/QuestionListPage";
import FeedbackListPage from "./components/tools/feedback/FeedbackListPage";
import NotFoundPage from "./components/misc/NotFoundPage";

import {
  USER_TYPE_MODERATOR,
  USER_TYPE_ADMIN,
} from "./constants";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/" render={() => <Redirect to="welcome" />} />
      <Route exact path="/welcome" component={withAuth(Welcome)} />
      <Route exact path="/logout" component={Logout} />
      <Route path="/">
        <MenuFrame>
          <Route exact path="/home" component={withAuth(Home, { private: true })} />
          <Route exact path="/login" component={withAuth(Login, { props: { loginPath: "/login" } })} />
          <Route exact path="/signup" component={withAuth(Login, { props: { loginPath: "/login" } })} />
          <Route exact path="/credits" component={Credits} />
          <Route exact path="/user/:id" component={withAuth(UserPage, { private: true })} />
          <Route exact path="/subjects" component={withAuth(SubjectsPage)} />
          <Route exact path="/docs" render={() => <Redirect to="docs/all" />} />
          <Route exact path="/docs(.*)" component={DocumentationPage} />
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
                permissions: { type: USER_TYPE_MODERATOR },
              })
            }
          />
          <Route
            exact
            path="/admin/questionsearch"
            component={
              withAuth(QuestionListPage, {
                private: true,
                permissions: { type: USER_TYPE_MODERATOR },
                props: {
                  mode: "adminSearch",
                },
              })
            }
          />
          <Route
            exact
            path="/admin/usersearch"
            component={
              withAuth(UserListPage, {
                private: true,
                permissions: { type: USER_TYPE_ADMIN },
              })
            }
          />
          <Route
            exact
            path="/admin/feedbacksearch"
            component={
              withAuth(FeedbackListPage, {
                private: true,
                permissions: { type: USER_TYPE_MODERATOR },
                props: {
                  mode: "adminSearch",
                },
              })
            }
          />

          {/* Tool Pages */}
          <Route
            exact
            path="/tools"
            component={
              withAuth(ToolsPage, {
                private: true,
              })
            }
          />
          <Route
            exact
            path="/tools/questioncreator"
            component={
              withAuth(QuestionCreatorPage, {
                private: true,
              })
            }
          />
          <Route
            exact
            path="/tools/questionscontributed"
            component={
              withAuth(QuestionListPage, {
                private: true,
                props: {
                  mode: "userContributions",
                },
              })
            }
          />

          {/* Below are test paths for development... */}
          <Route
            exact
            path="/qaviewer/:questionId"
            component={
              withAuth(QaViewerPage, {
                private: true,
                permissions: { type: USER_TYPE_ADMIN },
              })
            }
          />
          <Route
            exact
            path="/questionviewer/:questionId"
            component={
              withAuth(QuestionViewerPage, {
                private: true,
                permissions: { type: USER_TYPE_ADMIN },
              })
            }
          />

          {/* This is the 404 Page */}
          <Route path="*" component={NotFoundPage} />
        </MenuFrame>
      </Route>
    </Switch>
  </div>
);

export default App;
