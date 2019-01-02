/* eslint-disable max-len,react/no-unescaped-entities */
import React from "react";
import { Grid, Header } from "semantic-ui-react";

import ResponsivePlayer from "../ResponsivePlayer";

import {
  SITE_NAME,
} from "../../../constants";

export default [
  {
    key: "intro",
    title: {
      content: "Introduction (3 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Creating an account
                  <Header.Subheader>
                    Sign-up or login with e-mail and password. JWT is returned via GraphQL mutation.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/01-starting-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Enrolling as a student
                  <Header.Subheader>
                    A new student can enroll and set whether they are more familiar with US or Metric units. {SITE_NAME} will teach the student appropriately.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/01-enrolling-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  3) Building a course load
                  <Header.Subheader>
                    Students choose what subjects and scales they want to learn. Scale choices are important. Length, for example, can encompass centimeters to measure someone's height or kilometers to measure distances between cities.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/02-assigning-subjects-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "challengeMode",
    title: {
      content: "Challenge Mode (9 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Starting a new Challenge
                  <Header.Subheader>
                    A student can customize what subjects they want to tackle and the length of their Challenge.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/03-kickoff-page-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Answering Questions: Multiple choice
                  <Header.Subheader>
                    The most basic form of question. Choose between 2 to 6 possible answers.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-a-multiple-choice-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  3) Answering Questions: Direct input (single unit)
                  <Header.Subheader>
                    The toughest questions demand the student to directly input their answer. I use a custom keypad to save time on activating and deactivating mobile keyboards.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-b-direct-single-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  4) Answering Questions: Direct input (split unit)
                  <Header.Subheader>
                    Intelligent support for input in feet & inches, pounds & ounces, and gallons, quarts, & fluid ounces.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-b-direct-split-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  5) Answering Questions: Slider input
                  <Header.Subheader>
                    To discourage guessing slider input is designed to be sure that the correct answer isn't always somewhere in the middle.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-c-slider-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  6) Answering Questions: Survey response
                  <Header.Subheader>
                    Survey responses use slider input and have a predefined input range. Personal notes are also supported on some Surveys and are used to enrich questions.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-c-slider-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  7) Answering Questions: Incorrect responses
                  <Header.Subheader>
                    Incorrect responses hurt Mastery Score and uses a strike system before giving up. {SITE_NAME} will remember incorrect answers to help a student learn from their mistakes.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-e-incorrect-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  8) Skipping questions
                  <Header.Subheader>
                    Students can skip any question at the cost of Mastery Score.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-e-skip-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  9) Completing a Challenge
                  <Header.Subheader>
                    At the end of a Challenge the student will see a summary of their progress.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/04-F-complete-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "feedback",
    title: {
      content: "Help and Feedback (2 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Conversion tips pop-up
                  <Header.Subheader>
                    Conversion tips are always available for instant review on any question.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/05-popup-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Question feedback system
                  <Header.Subheader>
                    Users can send me feedback if they find a mistake or an issue with any question they come across. There are hundreds of questions so this is very helpful.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/06-feedback-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "responsive",
    title: {
      content: "Responsive Design (1 demo)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Responsive design using Semantic-UI-React
                  <Header.Subheader>
                    {SITE_NAME} was designed to work on mobile and desktop equally well. It's responsive and relatively lightweight. It supports cases where a user might not have a connection when finishing their Challenge and won't lose their progress.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/08-responsive-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "newQuestions",
    title: {
      content: "Creating Questions (3 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Creating a new question (selecting the sub-subject)
                  <Header.Subheader>
                    Subjects and scales are all linked to the database. New subjects and scales require no client code updates.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-B-new-question-A-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Creating a new question (writing the question)
                  <Header.Subheader>
                    Different questions require different answer structures. This shows the most basic written type.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-B-new-question-B-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  3) Creating a new question (writing the answers)
                  <Header.Subheader>
                    The answer writing interface is full of little quality-of-life features such as batch editing answer units (shown here).
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-B-new-question-C-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "adminQuestions",
    title: {
      content: "Question Admin Tools (2 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Reviewing new questions (searching by "Review Pending" status)
                  <Header.Subheader>
                    When people submit new questions admins and moderators must first review the question.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-C-question-browser-A-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Reviewing new questions (updating status to "active")
                  <Header.Subheader>
                    If the question is correct and organized properly the question can now appear in Challenges for all students.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-C-question-browser-B-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "adminUsers",
    title: {
      content: "User Admin Tools (3 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Reviewing user accounts (searching for students)
                  <Header.Subheader>
                    There are student, teacher (future feature), moderator, and admin account types on {SITE_NAME}.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-D-user-browser-A-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Reviewing user accounts (reviewing user information)
                  <Header.Subheader>
                    Admins and moderators can review user accounts and make changes on these accounts without leaving the page.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-D-user-browser-B-02.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  3) Reviewing user accounts (changing type, status, and account flags)
                  <Header.Subheader>
                    In this example the admin disallows a student from submitting new questions to the site.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-D-user-browser-C-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "adminFeedback",
    title: {
      content: "Feedback Admin Tools (3 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Feedback review (looking at new, un-reviewed question feedback)
                  <Header.Subheader>
                    This is where admins can review user feedback and see what they say.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-E-feedback-browser-A-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Feedback review (fixing a bad question)
                  <Header.Subheader>
                    Here the admin quickly takes action on a user's feedback submission.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-E-feedback-browser-B-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  3) Feedback review (closing the feedback item)
                  <Header.Subheader>
                    Here the admin marks the user's feedback as "approved". Their suggestion was helpful!
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/07-E-feedback-browser-C-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
  {
    key: "documentation",
    title: {
      content: "Student Documentation (2 demos)",
    },
    content: {
      content: (
        <Grid columns="equal" textAlign="center">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  1) Breadth and depth of documentation
                  <Header.Subheader>
                    {SITE_NAME} contains dozens of pages worth of painstakingly detailed and edited documentation and dozens of clever tips on converting dozens of different units.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/09-documentation-A-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                <Header.Content>
                  2) Documentation single-source-of-truth and dynamic routing
                  <Header.Subheader>
                    Documentation takes advantage of React's component modularity and applies SSOT design. Routing is also dynamic and provides auto-scrolling on page load.
                  </Header.Subheader>
                </Header.Content>
              </Header>

              <ResponsivePlayer
                xyRatio={4 / 3}
                player={{
                  volume: 0,
                  muted: true,
                  playing: true,
                  loop: true,
                  playsinline: true,
                  url: "https://s3-us-west-2.amazonaws.com/metric-teacher/media/demo/09-documentation-B-01.mp4",
                }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ),
    },
  },
];
