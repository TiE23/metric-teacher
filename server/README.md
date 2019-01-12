<h1 align="center">📐🗄🗂🗳📏 metric-teacher Server 📏🗳🗂🗄📐</h1>
This is the documentation for the server side of the metric-teacher project, a Node.js GraphQL API software project.

This is a project conceived and implemented completely by myself, Kyle Geib. UW Bothell educated, Seattle located SDET turned Product Support Engineer turning to eventual JavaScript Full-Stack Developer. I've been a professional programmer since 2013-01-02.

It is written with...
* Prisma - [github.com/prismagraphql/prisma](https://github.com/prismagraphql/prisma)
    * GraphQL-Yoga️ - [github.com/prismagraphql/graphql-yoga](https://github.com/prismagraphql/graphql-yoga)
    * Prisma-Binding - [github.com/prismagraphql/prisma-binding](https://github.com/prismagraphql/prisma-binding)
* dcodeIO's bcrypt.js - [github.com/dcodeIO/bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
* auth0's node-jsonwebtoken - [github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
* Facebook's Jest - [jestjs.io](http://jestjs.io/)
* Javier Cejudo's linear-converter - [github.com/javiercejudo/linear-converter](https://github.com/javiercejudo/linear-converter)
    * linear-presets - [github.com/javiercejudo/linear-presets](https://github.com/javiercejudo/linear-presets)
* Lodash - [lodash.com](https://lodash.com/)

It uses [**MySQL**](https://www.mysql.com/) for its Database, [**Prisma**](https://www.prisma.io/) for its GraphQL Database, and [**Docker**](https://www.docker.com/) + [**Docker-Compose**](https://docs.docker.com/compose/overview/) to build and run the virtual machines for these programs.

It is written against **Node.js v10.5.0**, though it does not use any bleeding-edge JavaScript.

I wrote it using the following tools:
* JetBrain's WebStorm IDE - [jetbrains.com/webstorm](https://www.jetbrains.com/webstorm/)
* Prisma's GraphQL Playground IDE - [github.com/prismagraphql/graphql-playground](https://github.com/prismagraphql/graphql-playground)
* Sublime HQ's Sublime Text 3 Text Editor - [sublimetext.com/3](https://www.sublimetext.com/3)
* syntevo's SmartGit Git Client - [syntevo.com/smartgit](https://www.syntevo.com/smartgit/)

*First commit made on 2018-05-07 but an idea in my head since mid-2015.*

## dotenv
There is a secret file that is not in this repo: `.env`
(to be explicit, it's located at `./server/.env`)

This file has a few things that need to be kept secret (hint, they're the ones with "secret" in the name):
```
PRISMA_STAGE="dev"
PRISMA_ENDPOINT="http://self:4466/server/dev"
PRISMA_CLUSTER="local"
PRISMA_SECRET="SOME_PRISMA_SECRET"
APP_SECRET="SOME_APP_SECRET"
PRISMA_MANAGEMENT_API_SECRET="SOME_PRISMA_MANAGEMENT_API_SECRET"
```

You start the Prisma + MySQL DB docker containers by using `docker-compose` (install Docker locally on your machine) and running `docker-compose -f ./database/docker-compose.yml up -d`. It's intentional that you run the program from this directory, `./server`, so that the `.env` file can be read by `docker-compose` automatically.
You kick-off the Prisma server by using the command `prisma deploy` if you've installed the prisma module globally (with `npm i -g prisma`), otherwise `yarn prisma deploy`/`npm run prisma deploy` should work.

The three secret keys should be random strings of characters and digits and symbols. I used random [`UUID4`](https://www.uuidgenerator.net/)s for mine.

`PRISMA_SECRET` is the secret key for the Prisma server (a local Docker container). If you change this secret you'll need to re-deploy the Prisma server. From there you can use `prisma token` to grab a new token if needed. This token is used when using the Playground when you add to the HTTP header like this:
```
{
  "Authorization" : "Bearer <token>"
}
```

`APP_SECRET` is used by the login system for the server. It is used as the secret key to the [`JWT token`](https://jwt.io/) signing process in `src/utils.js`. If you change this secret all users will have to log in again.

Finally, `PRISMA_MANAGEMENT_API_SECRET` was added in Prisma 1.7 that provides an easier and cleaner password system between your host computer and the Prisma server (it replaces a traditional SSH key). It is defined and used in `~/.prisma/config.yml`, for example:
```
clusters:
  local:
    host: 'http://localhost:4466'
    clusterSecret: "SOME_PRISMA_MANAGEMENT_API_SECRET"
```

Both `docker-compose` and `prisma deploy` read this secret. `docker-compose` feeds it in while launching the container, and `prisma deploy` uses it to gain access.

You *need to create this file* before things can run. You can even copy the example I have above if you want.

This file is used by the module [`dotenv`](https://github.com/motdotla/dotenv).

If you ever do remote hosting, you'll need to change the endpoint's url to the remote host's location, and change the `PRISMA_CLUSTER` value to whatever additional cluster you define in `~/.prisma/config.yml` (like the above example for `local`). You should do this by defining a second `.env` file with a name like `.env.remote` and then run, for example, `prisma deploy -e /.env.remote`.

## Hosting on AWS
At the time of writing I place the two parts of the back-end of Metric-Teacher onto two separate AWS EC2 instances. I name them "Server" and "PrismaDB".

### Docker-Machine
Configuring Docker-Machines on AWS requires a bit of a set-up but makes everything possible.

From my personal notes:
1) I had docker and docker-machine already installed. Try `docker --version` and `docker-machine --version` to see if they're working.
2) I had to get AWS tokens: [Here](https://console.aws.amazon.com/iam/home#/security_credential)
3) Then I installed the AWS CLI ([instructions here](https://docs.aws.amazon.com/cli/latest/userguide/installing.html))
4) I let `aws configure` do the configuration for me as [followed here](https://docs.docker.com/machine/drivers/aws/#configuring-credentials), entering in my key and secret.
5) I then ran the create command for docker-machine as [followed here](https://docs.docker.com/machine/drivers/aws/#aws-credential-file).
6) From there I configured my docker-machine's [bash scripts](https://docs.docker.com/machine/install-machine/#install-bash-completion-scripts).
  * To do this I downloaded the bash scripts it downloads (I put them in OneDrive for safe keeping and symlinked them from /usr/local/etc/bash_completion.d/ - a directory I choose because the one under /etc was empty)
  * In my ~/.bash_profile (also symlinked to OneDrive for safe keeping) I modified my PS1 (the thing that determines the look of your prompt in bash), adding a new section: $(__docker_machine_ps1 "\[%s\]")
  * And before that PS1 line I had source commands to each .bash script
7) From there I could run a command: `docker-machine use aws01` (the name of my first aws docker-machine, example create I followed [here](https://docs.docker.com/machine/drivers/aws/#aws-credential-file)) and the notice in my PS1 would appear that I was using the remote docker-machine.
8) To return to my local docker-machine I could run the command: `docker-machine use -u` and it would unset.
9) I could see the difference by simply running `docker ps` and see which docker-machines had what on them.

#### Launching Instances
Creating new instances isn't too hard. Here are the command I used:
`docker-machine create --driver amazonec2 --amazonec2-region us-west-2 --amazonec2-instance-type t2.micro --amazonec2-keypair-name myKey --amazonec2-ssh-keypath ~/.ssh/id_rsa metric-teacher-server01`

I was from the start telling AWS to associate my personal SSH key with the instance so I could immediately SSH into it. In this example in `~/.ssh` there are two files, `id_rsa` and `id_rsa.pub`. The create command assumes you have the private key as whatever name you give (example: `./myKey`) and the public key as the same file but with `.pub` (example: `./myKey.pub`).

The instance is a micro instance and named `metric-teacher-server01`

I could then switch to that machine with `docker-machine use metric-teacher-server01`

##### Elastic IP Addresses
Amazon gives every user the option to reserve 5 IPv4 addresses to assign to their instances. So I grabbed a new IP address and associated it with each new instance I wanted to use.

Then, on my DNS service I associated those IP addresses with different subdomains. In my case, metric-teacher.com & www․metric-teacher.com went to the client instance, api․metric-teacher.com went to the server instance, and db․metric-teacher.com went to the Prisma+MySQL instance.

### UP'ing Prisma + MySQL
If you read the section just before this I actually created another instance named `metric-teacher-prismadb01`. Same exact create command, just a different name.

To install the Prisma application and MySQL server I used `docker-machine use metric-teacher-prismadb01` and then ran, from `./server` the command `docker-compose -f ./database/docker-compose-aws-prod.yml up -d`

When it was done I could see that things were running with `docker ps`

#### New dotenv file
Because I was running a **local docker machine** already for local development I had to create a separate `.env` file for use on AWS named `.env.aws.prod` that looked like this:
```
PRISMA_STAGE="prod"
PRISMA_ENDPOINT="http://db.metric-teacher.com/server/prod"
PRISMA_CLUSTER="metric-teacher-prismadb01"
PRISMA_SECRET="<<SECRET>>"
APP_SECRET="<<SECRET>>"
PRISMA_MANAGEMENT_API_SECRET="<<SECRET>>"
```
In my ~/.prisma/config.yml looked like this:
```
clusters:
  metric-teacher-prismadb01:
    host: "http://db.metric-teacher.com"
    clusterSecret: "<<PRISMA_SECRET>>"
```

Then I could deploy the dataseed to the database with `prisma deploy -e .env.aws.prod`

#### Testing
I could visit db․metric-teacher.com/server/prod (assuming `PRISMA_STAGE` in the .env file was set to "prod" that is) and by running `prisma token -e .env.aws.prod` I could then test that Prisma and the DB were talking to each other and properly seeded.

The header setting:
```
{
  "Authorization": "Bearer <<TOKEN>>"
}
```
An example query:
```
query prisma {
  users {
    id
    email
  }
}
```
Don't forget to add good Security Group settings to limit access. You don't want strangers trying to hit your VM's port 22!

### Up'ing Server
This was pretty simple.

Switch to the docker-machine with a command like `docker-machine use metric-teacher-server01` and from `./server` run `docker-compose -f ./docker-compose-aws-prod.yml up -d`

It'll put the server into action, answering on port 80 (HTTP). So you can visit api․metric-teacher.com and run a public query like this:
```
query server {
  allSubjects {
    name
    subSubjects {
      id
      name
    }
  }
}
```
If it returns a bunch of data, hooray, everything is OK. db․metric-teacher.com is responding to api․metric-teacher.com. Everything should be fine.

## Traefik
HTTPS security is provided through [Traefik](https://traefik.io/) and Let's Encrypt. This complicates things but I tried my best to be sure that it went all as smoothly as possible.

Mostly the thing to look for is the docker-compose files with -traefik appended at the end of them.

Because each EC2 instance I have only has one docker-compose file to deal with, I had to add a traefik container to each docker-compose file of mine and configure them.

This really assumes that you've already been able to build and host the site without HTTPS security in the above sections.

### UP'ing Prisma + MySQL with Traefik
We're going to assume you've been running the prod version of the site already. If that's the case, you'll obviously want to back up the database before you shut it down. Read the section below "MySQL Backup" to learn how to do that. You can learn the commands to restore it by reading the comments at the bottom of `./database/backup-db.sh`. I won't go over them here.

#### New dotenv file
In prep for switching the whole stack to HTTPS I created a new dotenv file `.env.aws.prod.traefik` that is identical to `.env.aws.prod` except that the `PRISMA_ENDPOINT` variable is set to an https:\/\/ address.
```
PRISMA_STAGE="prod"
PRISMA_ENDPOINT="https://db.metric-teacher.com/server/prod"
PRISMA_CLUSTER="metric-teacher-prismadb01"
PRISMA_SECRET="<<SECRET>>"
APP_SECRET="<<SECRET>>"
PRISMA_MANAGEMENT_API_SECRET="<<SECRET>>"
```

#### Nuking db
**☢️The following command will delete your database, so back it up first and check the results☢️**

Bring down the existing Prisma + MySQL stack with, from `./server` directory the command `docker-compose -f ./docker-compose-aws-prod.yml down`

That should properly kill your whole database system. Congrats, your site is down!

#### Initializing acme
Now, navigate to `./server/traefik` and run the following two commands:
`sh init-acme.sh db.metric-teacher.com`
`sh upload-traefik.sh db.metric-teacher.com`

They'll create a new blank `acme.json` file on db.metric-teacher.com and upload the `traefik.toml` file I have there for configuration purposes.

The `acme.json` file is where Traefik stores your SSL cert stuff. It should be protected and preferrably backed-up (you can only get a [certain amount of certs a week](https://letsencrypt.org/docs/rate-limits/)). The `traefik.toml` file contains configuration settings for the application.

#### Bring up Prisma + MySQL with Traefik
Navigate back to `./server` directory. Run the command `docker-compose -f ./database/docker-compose-aws-prod-traefik.yml up -d`

#### Restore the database
Now you'll need to restore the database. Like I said, look at the comments at the bottom of `./database/backup-db.sh` for instructions.

#### Testing
Generate the prisma token again with `prisma token -e .env.aws.prod.traefik`, then follow the steps above in "Up'ing Prisma + MySQL" to test the database's contents.

### Up'ing Server with Traefik
This is simple in comparison.

#### Nuking server
Take down the existing server (don't worry, this won't cause issues)

From `./server` run `docker-compose -f ./docker-compose-aws.prod.yml down`

#### Bring up server with traefik
Run `docker-compose -f ./docker-compose-aws-prod-traefik.yml up -d --build`

#### Testing
Visit api․metric-teacher.com and run the same stuff as described above under "Up'ing Server".

## MySQL Backup
I've written a script `./database/backup-db.sh`. You need to have SSH access to the machine. Navigate to `./database` and create a directory named `backups`. I personally made this directory in a safe location and sym-linked it to this location (so that if I deleted my project directory I wouldn't lose my backups!)

Run `sh backup-db.sh db.metric-teacher.com` and it should create a new file for you in backups. The file that was created will have its first line printed, so if it looks wrong then you can tell. This backed-up my entire database from top to bottom.

### Cron
I had to take extra steps to add support for cron jobs to back-up the database regularly. But because cron doesn't have an SSH agent that means to SSH into my server I needed a new SSH key that didn't have a passphrase.

#### New SSH Key
This was simple. Generate one with `ssh-keygen` and you'll follow steps to create it. Name it something unique-ish like `cron-id_rsa`. Copy down the full path to the key.

Now to add the key's public key to the server's accepted keys run the following command:
`cat cron-id_rsa.pub | ssh ubuntu@db.metric-teacher.com "cat >> .ssh/authorized_keys"`

This will allow the SSH key to access the server. **Remember to keep the key safe and to use firewall rules to only allow port 22 access from your IP address.**

#### Edit Crontab
You can edit your crontab by running `EDITOR=nano crontab -e`. You'll get to edit the file in nano (hit ctrl+X to exit, typing "y" to save the file)

Then, you can define a new cron job like this:

`00 */8 * * * cd /path/to/this/directory && sh backup-db.sh db.metric-teacher.com cron /path/to/id_rsa`

This will run every 8 hours.

## GraphQL API Documentation
### Types
#### User
For public-ish use. It does not expose password, email, enrollment, or classroomsTeaching. It does, however, expose first and last names. So take note about ever making this truly public.
```
type User {
   id: ID!
   createdAt: DateTime!
   updatedAt: DateTime!
   honorific: String
   fname: String
   lname: String
   type: Int!
   status: Int!
   flags: Int!
 }
```

#### PrivateUser
For private use. It does not expose password.
```
type PrivateUser {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  honorific: String
  fname: String
  lname: String
  type: Int!
  status: Int!
  flags: Int!
  enrollment: Enrollment
  classroomsTeaching: [Classroom!]!
  feedbackWritten: [Feedback!]!
  feedbackReviewed: [Feedback!]!
  questionsWritten: [Question!]!
  questionsReviewed: [Question!]!
}
```

#### QaObject
This is a complexly structured type with many nested types in order to recreate the deeply nested structure of a QA JSON object.
The id of a QA Object is the Question ID prefixed with `QA_` followed by a three digit number, starting at 000, indicating in which order it was generated whether through the queries `getQa` or `generateChallenge`.
```
type QaObject {
  id: ID!
  questionId: ID!
  subSubjectId: ID!
  difficulty: Int!
  flags: Int!
  status: Int!
  media: String
  subject: QaSubjectObject {
    name: String!
    scale: String!
    toMetric: Boolean!
  }
  question: QaQuestionObject {
    detail: String!
    text: String!
    type: Int!
    data: QaQuestionData {                      # Conversion + Survey Questions only
      fromUnitWord: type QaUnitWordObject {
        plural: String!
        singular: String!
      }!
      conversion: QaConversionQuestionObject {  # Conversion Questions Only
        range: QaRangeObject {
          top: QaUnitObject! {
            value: Float!
            unit: String!
          }
          bottom: QaUnitObject {
            value: Float!
            unit: String!
          }
        }!
        exact: QaUnitObject {
          value: Float!
          unit: String!
        }!
        step: Float!
      }
      survey: type QaSurveyQuestionObject {     # Survey Questions Only
        step: Float!
        range: QaRangeObject {
          bottom: type QaUnitObject {
            value: Float!
            unit: String!
          }!
          top: QaUnitObject {
            value: Float!
            unit: String!
          }!
        }!
        response: QaSurveyResponseObject {      # Only if survey was answered
          surveyId: ID!
          score: Int!
          answer: QaUnitObject {
            value: Float!
            unit: String!
          }!
          detail: String
        }
        status: Int                             # Only if survey was answered
      }
    }
  }!
  answer: QaAnswerObject {
    detail: String!
    type: Int!
    data: QaAnswerData {
      accuracy: Number                    # Conversion and Survey Questions Only
      unit: String                        # Conversion and Survey Questions Only
      toUnitWord: QaUnitWordObject {      # Conversion and Survey Questions Only
        plural: String!
        singular: String!
      }
      multiple: QaMultipleChoiceObject {  # Written Questions Only
        choicesOffered: Int!
        choices: [QaMixedUnitObject {
          value: Float    # For number answers
          written: String # For string answers
          unit: String!   # Always defined
        }]!
      }
      conversion: QaConversionObject {    # Conversion and Survey Questions Only
        range: QaRangeObject {
          bottom: QaUnitObject!
          top: QaUnitObject!
        }!
        exact: Float!
        rounded: Float!
        friendly: Float!
        choices: [QaUnitObject {
          value: Float!
          unit: String!
        }]!
      }
        survey: QaSurveyAnswerObject {    # Survey Questions when survey completed Only
        choices: [QaUnitObject {
          value: Float!
          unit: String!
        }]!
      }
    }!
  }!
}
```

### Inputs
#### MasteryScoreInput
```
MasteryScoreInput {
  subsubjectid: ID!
  score: Int!
}
```

#### SurveyScoreInput
```
SurveyScoreInput {
  surveyid: ID!
  score: Int!
}
```

#### SurveyAnswerInput
```
SurveyAnswerInput {
  questionid: ID!
  skip: Boolean
  value: Float
  unit: String
  score: Int
  detail: String
}
```

#### QuestionQuestionInput
```
QuestionQuestionInput {
  text: String
    rangeinput: QuestionQuestionRangeInput: {
      lower: Float!
      upper: Float!
      unit: String!
      step: Float
    }
}!
```

#### QuestionAnswerInput
```
QuestionAnswerInput: {
  detail: String
  multiplechoiceinput: QuestionAnswerMultipleChoiceInput: {
    choices: [
      ChoiceInputRow: {
        value: Float
        written: String
        unit: String!
      }!
    ]!
    choicesoffered: Int
  }
  conversioninput: ConversionAnswerInput: {
    unit: String!
    accuracy: Float
  }
}!
```

### Queries
#### User Queries
* `me: PrivateUser`
    * Basic argument-free query that takes the calling user (identified by the provided Authorization JWT Bearer HTTP header) who is logged in and returns the content of their user account via the type PrivateUser.
* `user(userid: ID!): PrivateUser`
    * Get the PrivateUser data of a user account. Only the owning user (or moderators or better) can do this. This essentially becomes a me() query providing far greater simplicity for client logic allowing shared code between self data and other user data.
* `users(userids: [ID!]!): [PrivateUser]!`
    * Get the PrivateUser data of multiple user accounts by their ID. For moderators and better only.
* `userSearch(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [PrivateUser]!`
    * Get the PrivateUser data of multiple user accounts. For moderators and better only. Exposes Prisma Query parameters.

#### Classroom Queries
* `classroom(classroomid: ID!): Classroom`
    * Get a classroom by a single Classroom Id. For moderators or better only. Students and Teachers can get it through me().
* `classrooms(classroomids: [ID!]!): [Classroom]!`
  * Get a list of Classrooms by their IDs. For moderators or better only. Students and Teachers can get them through me().
* `classroomSearch(where: ClassroomWhereInput, orderBy: ClassroomOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Classroom]!`
  * Get a list of Classrooms by Prisma query search parameters. For Moderators or better only because of potentially sensitive data. Students and Teachers can get them through me().

#### Course Queries
* `activeCourse(studentid: ID!): Course`
    * Gives access to the active Course of a student. Will return null if there is no active Course. For students checking themselves and mods or better only.
* `course(courseid: ID!): Course`
    * Get a Course by its ID. Only the owning student (or moderators or better) can do this.
* `courses(courseids: [ID!]!): [Course]!`
    * Get a list of Courses by their IDs. Only the owning student (or moderators or better) can do this.
* `courseSearch(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!`
    * Get a list of Courses by Prisma query search parameters. For Moderators or better only because of potentially sensitive data. Students can get them through me().

#### Mastery Queries
* `activeMasteries(studentid: ID!): [Mastery]!`
    * Gives access to the active Masteries of a student. Will return [] if there are no active Masteries. For students checking themselves and mods or better only.
* `mastery(masteryid: ID!): Mastery`
    * Get a Mastery by Mastery ID. Only the owning student (or moderators or better) can do this.
* `masteries(masteryids: [ID!]!): [Mastery]!`
    * Get a list of Masteries by a list of Mastery IDs. Only the owning student (or moderators or better) can do this.
* `masterySearch(where: MasteryWhereInput, orderBy: MasteryOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Mastery]!`
    * Get a list of Masteries by Prisma query search parameters. For moderators or better only because of potentially sensitive data. Students can get through other options.

#### Subject Queries
* `allSubjects: [Subject]!`
    * Get a list of all Subjects. Available to the public.
* `subject(subjectid: ID!): Subject`
    * Get a Subject by a single ID. For logged-in and normal users only.
* `subjects(subjectids: [ID!]!): [Subject]!`
    * Get a list of Subjects by their IDs. For logged-in and normal users only.
* `subjectSearch(where: SubjectWhereInput, orderBy: SubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Subject]!`
    * Get a list of Subjects by Prisma query search parameters. For logged-in and normal users only.

#### SubSubject Queries
* `allSubSubjects: [SubSubject]!`
    * Get all SubSubjects. For logged-in and normal users only.
* `subSubject(subsubjectid: ID!): SubSubject`
    * Get a SubSubject by ID. For logged-in and normal users only.
* `subSubjects(subsubjectids: [ID!]!): [SubSubject]!`
    * Get a list of SubSubjects by a list of IDs. For logged-in and normal users only.
* `subSubjectSearch(where: SubSubjectWhereInput, orderBy: SubSubjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SubSubject]!`
    * Get a list of SubSubjects by Prisma query search parameters. For logged-in and normal users only.

#### Survey Queries
* `activeSurveys(studentid: ID!): [Survey]!`
    * Give access to the active Surveys of a student. Will return [] if there are no active Surveys. Only the owning student (or moderators or better) can do this.
* `survey(surveyid: ID!): Survey`
    * Get a Survey by a Survey ID. Only the owning student (or moderators or better) can do this.
* `surveys(surveyids: [ID!]!): [Survey]!`
    * Get a list of Surveys by a list of Survey IDs. Only the owning student (or moderators or better) can do this.
* `surveySearch(where: SurveyWhereInput, orderBy: SurveyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Survey]!`
    * Get a list of Surveys by Prisma query search parameters. For moderators or better only because of potentially sensitive data. Students can get through other options.

#### Question Queries
* `question(questionid: ID!): Question`
    * Get a Question by ID. For normal users only.
* `questions(questionids: [ID!]!): [Question]!`
    * Get a list of Questions by a list of IDs. For normal users only.
* `questionSearch(where: QuestionWhereInput, orderBy: QuestionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Question]!`
    * Get a list of Questions by Prisma query search parameters. For teachers and better only.
* `checkSubmitQuestion(type: Int!, questioninput: QuestionQuestionInput!, answerinput: QuestionAnswerInput!): Boolean!`
    * Provide a quick dry-run of submitQuestion. It'll throw up a bunch of errors if something is wrong, otherwise it'll return true. If this returns true, the question will be accepted.
    * See `QuestionQuestionInput` and `QuestionAnswerInput` Input types described above.

#### Feedback Queries
* `feedbackSearch(where: FeedbackWhereInput, orderBy: FeedbackOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Feedback]!`
    * Get a list of Feedbacks by Prisma query search parameters. For Moderators or better only because Feedback is typically only a Moderator thing. A Student, for example, can look at their own Feedback through their me() query.

#### QA Queries
* `generateChallenge(studentid: ID!, subjectids: [ID], subsubjectids: [ID], listSize: Int!, ignorerarity: Boolean, ignoredifficulty: Boolean, ignorepreference: Boolean): [QaObject]!`
    * Generate an entire list of QAObjects (called a "Challenge") based off a student ID and a list of Subject or SubSubject IDs. Additional boolean arguments help customize the results.
* `getQa(questionid: [ID!]!, studentid: ID): [QaObject]!`
    * Generates a list of QA objects from a list of Question IDs. If studentid is set it'll retrieve that student's active Course's Surveys pertaining to any inputted survey-type question IDs.

### Mutations
#### Auth Mutations
* `signup(email: String!, password: String!, fname: String, lname: String): AuthPayload!`
    * Sign up for an account. All arguments are required and emails need to be unique.
* `login(email: String!, password: String!): AuthPayload!`
    * Log in to the account of a user by providing the email and password. Bcrypt is used to check the password input for correctness.

#### User Mutations
* `updateUserProfile(userid: ID!, email: String, password: String, honorific: String, fname: String, lname: String): PrivateUser!`
    * Mutation providing a method to self-update user profile information. There are some additional checks on Moderators disallowing them from updating other Moderators or Admins. Admins, on the other hand, have full power.
* `updateUserStates(userid: ID!, type: Int, status: Int, flags: Int): PrivateUser!`
    * Mutation providing administrative-style updates to a User row. This includes changing the type, status, and flags of a User. There are some additional checks on Moderators disallowing them from updating other Moderators or Admins. Admins, on the other hand, have full power.

#### Enrollment Mutations
* `enrollStudent(studentid: ID!): Enrollment!`
    * Gives a student a new Enrollment and immediately gives them a new Course and sets it as active.

#### Course Mutations
* `assignStudentNewCourse(studentid: ID!, prefermetric: Boolean): Course!`
    * Give a student a new Course. They must be enrolled first, though.
* `setActiveCourse(studentid: ID!, courseid: ID!): Course!`
    * Will set a student's Courses all to inactive and the targeted Course to active. Requires the studentid to perform.
* `assignStudentNewMasteries(student: ID!, subsubjectids: [ID!]!): Course!`
    * Assigns subSubjects to a student's active Course. If at all possible prefer assignCourseNewMasteries() over this function as it involves an extra hit to the database to get the student's active Course. Only the owning student (or moderators or better) can do this.
* `deactivateCourse(courseid: ID!): Course!`
    * Deactivates a course. Only the owning student (or moderators or better) can do this.
* `updateCourseFlags(courseid: ID!, flags: Int!): Course!`
    * Updates the flags field of a course. Only the owning student (or moderators or better) can do this.
* `addMasteryScores(studentid: ID!, scoreinput: [MasteryScoreInput!]!): Course!`
    * Give a student ID and a list of combination SubSubject IDs and scores (positive or negative) and those values will be added to each valid Mastery belonging to that student's active Course. It automatically gathers the Mastery IDs so you don't need to! Only the owning student (or moderators or better) can do this.
    * See `MasteryScoreInput` Input type described above.
* `addSurveyScores(studentid: ID!, scoreinput: [SurveyScoreInput!]!): Course!`
    * Give a student ID and a list of combination Survey IDs and scores (positive or negative) and those values will be added to each valid Survey belonging to that student's active Course. Only the owning student (or moderators or better) can do this.
    * See `SurveyScoreInput` Input type described above.
* `addSurveyAnswers(studentid: ID!, answerinput: [SurveyAnswerInput!]!): Course!`
    * Answer or re-answer a series of Survey questions with a student ID and a list of inputs. It will target the student's active Course. Only the owning student (or moderators or better) can do this.
    * See `SurveyAnswerInput` Input type described above.
* `addChallengeResults(studentid: ID!, masteryscoreinput: [MasteryScoreInput]!, surveyscoreinput: [SurveyScoreInput]!, surveyanswerinput: [SurveyAnswerInput]!): Course!`
    * Batch update a student's masteries, survey scores, and survey answers after completing a challenge. Enter in the student's ID to target their active Course. Only the owning student (or moderators or better) can do this.
    * All the inputs are required, but you are allowed to not insert anything.
    * See `MasteryScoreInput`, `SurveyScoreInput`, and `SurveyAnswerInput` Input types described above.

#### Mastery Mutations
* `assignStudentNewMastery(studentid: ID!, subsubjectid: ID!): Mastery!`
    * Create a single new Mastery for a student by their user ID. Only the owning student (or moderators or better) can do this.
* `activateMastery(masteryid: ID!): Mastery!`
    * Activate a mastery. Only the owning student (or moderators or better) can do this.
* `deactivateMastery(masteryid: ID!): Mastery!`
    * Deactivate a mastery. Only the owning student (or moderators or better) can do this.
* `updateMasteryStatus(masteryid: ID!, status: Int!): Mastery!`
    *  Update a Mastery's status. Only the owning student (or moderators or better) can do this.
* `addMasteryScore(masteryid: ID!, score: Int!): Mastery!`
    * Give a Mastery ID and a score you want to increase/decrease the Mastery score by. Only the owning student (or moderators or better) can do this.

#### Classroom Mutations
* `createClassroom(name: String!, description: String, teacherid: ID!): Classroom!`
    * Create a new Classroom for a teacher. A teacher's User ID must be given as a Classroom should have at least one teacher (though this is not a technical necessity).
* `addUsersToClassroom(classroomid: ID!, userids: [ID!]!): Classroom!`
    * Add users (students or teachers) to a classroom. Only teachers (or better) can add students to classrooms they are teachers of.
* `removeUsersFromClassroom(classroomid: ID!, userids: [ID!]!): Classroom!`
    * Remove users (students or teachers) from a classroom. Only teachers (or better) can add students to classrooms they are teachers of. Teachers cannot remove students from classrooms where the student's active Course is not in that classroom.

#### Survey Mutations
* `addSurveyAnswer(studentid: ID!, answerinput: SurveyAnswerInput!): Survey!`
    * Answer or re-answer a Survey question. Only the owning student (or moderators or better) can do this.
* `updateSurveyStatus(surveyid: ID!, status: Int!): Survey!`
    * Update a Survey's status. Only the owning student (or moderators or better) can do this.
* `addSurveyScore(surveyid: ID!, score: Int!): Survey!`
    * Add a score value to a Survey's score field. Only the owning student (or moderators or better) can do this. The value can be negative to remove points. It will not be possible to make the score below the minimum (0) nor above the max (1000). If you want to set a score to 0, send -1000. If you want to set the score to 1000, send 1000.

#### Question Mutations
* `submitQuestion(subsubjectid: ID!, type: Int!, flags: Int!, difficulty: Int!, media: String, questioninput: QuestionQuestionInput!, answerinput: QuestionAnswerInput!): Question!`
    * Mutation that creates a new Question row from multiple inputs and with heavy checking will submit the question with a status putting it up for review. For normal users only.
    * See `QuestionQuestionInput` and `QuestionAnswerInput` Input types described above.
* `updateQuestion(questionid: ID!, subsubjectid: ID, type: Int, flags: Int, status: Int, difficulty: Int, media: String, questioninput: QuestionQuestionInput, answerinput: QuestionAnswerInput): Question!`
    * Mutation that updates an existing Question row from multiple inputs and with heavy checking will immediately change the question.
    * Everything in `questioninput` and `answerinput` is optional - allowing you to create incremental updates. EXCEPT for one thing:
        * `answerinput.multiplechoiceinput.choices` must be defined anew all together. You need to re-define all your answers at once, you cannot, say, only update the first item.
    * For moderator and admin users only.

#### Feedback Mutations
* `submitFeedback(questionid: ID!, type: Int!, text: String): Feedback!`
    * Simple mutation allows one to submit Feedback for a Question. All normal users can use this.
* `updateFeedbackStatus(feedbackid: ID!, status: Int!): Feedback!`
    * Simple mutation updates the status of a Feedback row. Useful if they've completed a review of a piece of user-submitted Feedback. For moderators or better only.

## Database Documentation
### User
* `id`
* `email`
* `honorific`
    * Optional string for prefixes such as "Mr.", "Mrs.", "Ms.", "Prof.", etc.
* `fname`
    * Optional user's first name.
* `lname`
    * Optional user's last name.
* `type`
    * `0` - Student (default)
    * `1` - Teacher
    * `2` - Moderator
    * `3` - Admin
* `status`
    * `0` - Normal
    * `1` - Closed
* `flags`
    * No flags have been defined yet.
* `classrooms`
    * Relations to Classroom rows the User is a member of.
* `enrollment`
    * For `type` student users only. Relation to Enrollment row.
* `feedback`
    * Relation to Feedack row.

### Classroom
* `id`
* `name`
* `description`
* `status`
    * `0` - Active
    * `1` - Inactive
* `flags`
    * No flags have been defined yet.
* `notes`
    * Additional string whose use is TBD.
* `users`
    * Relations to User rows who are members of the Classroom.

### Enrollment
* `id`
* `student`
    * For Students only. Relation to User row.
* `courses`
    * Relations to Course rows.

### Course
* `id`
* `status`
    * `0` - Active
    * `1` - Inactive
* `flags`
    * No flags have been defined yet.
* `parent`
    * Relation to Enrollment row.
* `masteries`
    * Relations to Mastery rows.
* `surveys`
    * Relations to Survey rows.

### Mastery
* `id`
* `status`
    * `0` - Active
    * `1` - Inactive
* `score`: Scale from 0 to 1000
    * A scale between 0 and 1000. 0 is the SubSubject hasn't been practiced at all. Each time a question is answered correctly this value goes up. When the score hits 1000 (totally mastered) it should stay there. But before that point while it's going up there should be a mechanism that deteriorates the score if had been a long time between practices.
* `parent`
    * Relation to Course row.
* `subSubject`
    * Relation to SubSubject row.

### Survey
* `id`
* `status`
    * Used to mark when a Survey question was skipped or not.
* `score`: Scale from 0 to 100
    * A scale between 0 and 100. 0 is the question hasn't been re-answered. Each time the question is answered correctly this value goes up. When the question has hit a certain point (a constant that can be defined, perhaps 50?) then it enters the conversion portion.
* `answer`
    * Answer string recorded from the user's response.
* `detail`
    * Optional extra detail string recorded from a user's response.
* `parent`
    * Relation to Course row.
* `question`
    * Relation to Question row.

### Subject
* `id`
* `name`
    * Unique string name of the Subject.
* `description`
* `subSubjects`
    * Relations to SubSubject rows.

### SubSubject
* `id`
* `name`
    * Unique string name of the subSubject.
* `description`
* `toMetric`
    * Boolean (read: Integer 0 or 1) value the indicates of the Questions in this SubSubject are concerned with converting to (true) or from (false) metric.
* `rarity` Scale from 0 to 100
    * A method of reducing the appearance of subsubjects' questions. It is a site-wide rarity setting that will *NOT* be adustable for different users.
    Rarity is determined by this algorithm:
        * _Every subSubject gets 100 chances to be picked in for the next question. The rarity number reduces those chances. All the chances of all possible subSubjects for a challenge are added together and a random number between 1 and that cumulative value is picked. If the number picked falls on one of those "chances" the subSubject is picked._
    * Scale
        * `0` - Common (default value, no chance of it being removed)
        * `50` - Appears half-as-often (1 out of 2 chance of it appearing as often as common questions)
        * `100` - Most rare (1 out of 100 chance of it appearing as often as common questions)
* `unit`
    * Relation to Unit row.
* `scale`
    * Relation to Scale row.
* `parent`
    * Relation to Subject row.
* `questions`
    * Relations to Question rows.
* `masteries`
    * Relations to Mastery rows. **This is worth paying attention to as it is a public access vector to user rows.**

### Question
* `id`
* `type`
    * `0` - Written question. The question is a specific question with a specific answer.
    * `1` - Conversion.
    * `2` - Survey.
* `status`
    * `0` - Enabled
    * `1` - Disabled
* `flags`
    * `0x01` - "User detail note requested - optional"
    * `0x02` - "User detail note requested - required"
* `difficulty`
    * Should offer an ability to have some flexibility to give more weight to correct answers for difficult questions and similarly forgive more for failing to answer them correctly.
    * Values
        * `1` - Easy
        * `2` - Easy/Medium
        * `3` - Medium (_default_)
        * `4` - Medium/Hard
        * `5` - Hard
* `question`
    * String of the question. Can be a specially formatted string (see logic documentation below).
* `answer`
    * String of the answer. Can be a specially formatted string (see logic documentation below).
* `media`
    * Optional string value of a particular media file.
* `parent`
    * Relation to SubSubject row.
* `feedback`
    * Relation to Feedack row.

### Feedback
* `id`
* `type`
    * Values
        * `0` - General
        * `1` - Incorrect
        * `2` - Confusing
        * `3` - Typo
* `status`
    * Values
        * `0` - Unreviewed
        * `1` - Reviewed - Approved (Fix was made)
        * `2` - Reviewed - Rejected (Won't fix)
* `text`
    * Optional string of detail.
* `question`
    * Relation to Question row.
* `author`
    * Relation to User row.

## Logic Documentation
### Question/Answer format
Because questions and answers can be a little more nuanced than something simple like "What is freezing temperature in Celsius?" with the answer "0", I had to define a special string formatting language so I could express complex questions and answers into single strings.

*Units*
* Metric
    * Length
        * `mm` - millimeter
        * `cm` - centimeter
        * `m` - meter
        * `km` - kilometer
    * Mass
        * `mg` - milligram
        * `g` - gram
        * `kg` - kilogram
        * `t` - metric ton / tonne
    * Volume
        * `ml` - milliliter
        * `l` - liter
        * `cum` - cubic meter
    * Temperature
        * `c` - Celsius
    * Velocity
        * `kmph` - kilometers per hour
        * `ms` - meters per second
    * Area
        * `sqm` - square meter
        * `ha` - hectare
        * `sqkm` - square kilometer
* US Customary Units
    * Length
        * `in` - inch
        * `ft` - foot
        * `yd` - yard
        * `mi` - mile
        * `nmi` - nautical mile
    * Mass
        * `oz` - ounce
        * `lb` - pound
        * `st` - stone
        * `ton` - short ton / US ton
        * `lton` - long ton / imperial ton
    * Volume
        * `cuin` - cubic inches
        * `floz` - US fluid ounce
        * `cup` - US cup (customary)
        * `pt` - US pint
        * `qt` - US quart
        * `gal` - US gallon
    * Temperature
        * `f` - Fahrenheit
    * Velocity
        * `fps` - feet per second
        * `mph` - miles per hour
        * `kn` - knot
    * Area
        * `sqft` - square foot
        * `ac` - acre
        * `sqmi` - square mile

*Multiple Choice Syntax*
* Multiple Choice Question
    * `What is length of 1 foot in centimeters?` (nothing special, write the question. Just do not use square brackets.)
* Multiple Choice Answer
    * `[#UNIT|#UNIT|#UNIT|#UNIT]` (simple, first choice is the correct one and order is randomized)
    * `[#UNIT|#UNIT|#UNIT|#UNIT|#UNIT]4` (first choice is the correct one and only up to 4 options will be displayed at once)

*Range Syntax*
Auto generated range questions will always ask a question like the following:
"Convert 1.80 meters to feet (within 0.5 feet accuracy)."
If you add some text, it will appear like so:
"Convert 1.80 meters to feet (within 0.5 feet accuracy). This is a typical height of an adult man."

* Text before range syntax
    * `This is a common room temperature. [#,#UNIT(#)s]` (simple, with a written sentence for syntax. Space optional.)
* Range Question (Conversion or Survey)
    * `[#,#UNIT(1)s]` (simple, with whole numbers)
    * `[#,#UNIT(0.1)s]` (with steps of 0.1)
    * `[#,#UNIT(10)s]` (with steps of 10)
    * `[#,#UNIT]` (no steps defined, defaults to 1)
* Range Answer (Conversion or Survey)
    * `[UNIT(1)a]` (simple, with whole numbers)
    * `[UNIT(0.5)a]` (accept an answer within 0.5 units accuracy)
    * `[UNIT(3)a]` (accept an answer within 3 units accuracy)
    * `[UNIT(0)a]` (accept only an exact answer)
    * `[UNIT]` (no accuracy defined, defaults to 1)

Examples:
* Q: `[5,10m(1)s]` A: `[ft(1)a]`
    * Would ask to convert a random whole number of meters between 5 and 10 (inclusive) and demand a conversion in feet accurate to within 1 foot.
* Q: `[18,22c(0.5)s]` A: `[f(2)a]`
    * Would ask to convert a random temperature between 18 and 22 Celsius in 0.5 increments and demand a conversion in Fahrenheit accurate to within 2 degrees.
* Q: `Starting at what height would you describe an adult man to be 'very tall'? [72,79in]` A: `[cm(3)a]` User's Survey Answer: `75in`
    * This question accepts a range between 72 to 79 inches (about 1.82 to 2.00m). A survey has four different phases:
        1) It starts by asking the user's opinion (that's when it gets the 75 inch answer).
        2) It asks the user to re-identify their answer from multiple choices. The wrong answers will be generated by randomly displaying +/- 1-4 times the step value `(#)s`. In this case, it might generate the following answers: 75in (correct), +1in (76in), -3in (72in), +3 (78in).
        3) When the user has confirmed their estimate enough times (after hitting a certain threshold tracked through the survey's score field) the survey question will instead ask the person to answer the question in metric with their US unit answer displayed. Multiple choices will be generated in the same manner as the second phase, simply converted to the Metric value
        4) Finally the same exact case as phase 3 but without showing the user's US Unit answer. (May consider randomly showing or not showing the US Unit answer. Perhaps let the user click on a "your answer is hidden" span that'll show it with perhaps only a small score/mastery penalty).

### Internal QA Object data Structure Examples
#### Written QA with answer detail (answer.detail)
**Question Row**
```
{
  id: <<someID>>,
  type: 0,
  status: 0,
  flags: 0,
  difficulty: 3,
  question: "If Jim is 6'1" and Harry is 195cm, who is taller?",
  answer: "195cm is about 6'5\" and 6'1\" is about 185cm. [Harry is taller|Jim is taller|They are about the same height]",
  media: "someMedia",
  parent: <<someSubSubject>>,
}
```
**QA Object**
```
{
  id: QA_###_<<someQuestionId>>,
  questionId: <<someQuestionId>>,
  subSubjectId: <<someSubSubjectId>>,
  difficulty: 3,
  flags: 0,
  status: 0,
  media: "someMedia",

  subject: {
    name: "Length",
    scale: "human",
    toMetric: true,
  },

  question: {
    data: null,
    detail: "",
    text: "If Jim is 6'1\" and Harry is 195cm, who is taller?",
    type: 0,
  },

  answer: {
    detail: "195cm is about 6'5\" and 6'1\" is about 185cm.",
    type: 0,
    data: {
      multiple: {
        choices: [
          { unit: "written", written: "Harry is taller" },
          { unit: "written", written: "Jim is taller" },
          { unit: "written", written: "They are about the same height" },
        ],
        choicesOffered: 3,
      },
    },
  },
}
```


#### Conversion QA, with context detail (question.detail)
**Question Row**
```
{
  id: <<someID>>,
  type: 1,
  status: 0,
  flags: 0,
  difficulty: 3,
  question: "This weight is typical of a 5 year old child. [35,45lb]",
  answer: "[kg]",
  media: "someMedia",
  parent: <<someSubSubject>>,
}
```
**QA Object**
```
{
  id: QA_###_<<someQuestionId>>,
  questionId: <<someQuestionId>>,
  subSubjectId: <<someSubSubjectId>>,
  difficulty: 3,
  flags: 0,
  status: 0,
  media: "someMedia",

  subject: {
    name: "Mass",
    scale: "human",
    toMetric: true,
  },

  question: {
    detail: "This weight is typical of a 5 year old child.",
    text: "",
    type: 1,
    data: {
      fromUnitWord: {
        plural: "pounds",
        singular: "pound",
      },
      conversion: {
        step: 1,
        range: {
          bottom: { unit: "lb", value: 35 },
          top: { unit: "lb", value: 45 },
        },
        exact: { unit: "lb", value: 42 },
      },
    },
  },

  answer: {
    detail: "",
    type: 1,
    data: {
      accuracy: 1,
      unit: "kg",
      toUnitWord: {
        plural: "kilograms",
        singular: "kilogram",
      },
      conversion: {
        range: {
          bottom: { unit: "kg", value: 18.05 },
          top: { unit: "kg", value: 20.05 },
        },
        exact: 19.05087954,
        rounded: 19.05,
        friendly: 19.05,
        choices: [
          { unit: "kg", value: 19.05 },
          { unit: "kg", value: 18.05 },
          { unit: "kg", value: 20.05 },
          { unit: "kg", value: 17.05 },
          { unit: "kg", value: 21.05 },
          { unit: "kg", value: 16.05 },
          { unit: "kg", value: 22.05 },
          { unit: "kg", value: 15.05 },
          { unit: "kg", value: 23.05 },
        ],
      },
    },
  },
}
```

#### Survey QA with survey response (answer.data.survey) and with detail (question.data.survey.response.detail)
**Question Row**
```
{
  id: <<someID>>,
  type: 2,
  status: 0,
  flags: 2,
  difficulty: 3,
  question: "How tall is the tallest person you personally know? Give your best guess if you don't know exactly. [70,96in]",
  answer: "[cm]",
  media: "someMedia",
  parent: <<someSubSubject>>,
}
```
**Survey Row**
```
{
  id: <<someID>>,
  status: 0,
  score: 0,
  answer: "[80in]",
  detail: "My neighbor Anthony",
  parent: <<someCourse>>,
  question: <<someQuestion>>,
}
```
**QA Object**
```
{
  id: QA_###_<<someQuestionId>>,
  questionId: <<someQuestionId>>,
  subSubjectId: <<someSubSubjectId>>,
  difficulty: 3,
  flags: 2,
  status: 0,
  media: "someMedia",

  subject: {
    name: "Length",
    scale: "human",
    toMetric: true,
  },

  question: {
    detail: "",
    text: "How tall is the tallest person you personally know? Give your best guess if you don't know exactly.",
    type: 2,
    data: {
      fromUnitWord: {
        plural: "inches",
        singular: "inch",
      },
      survey: {
        step: 1,
        range: {
          bottom: { unit: "in", value: 70 },
          top: { unit: "in", value: 96 },
        },
        response: {
          surveyId: <<someSurveyId>>,
          status: 0,
          detail: "My neighbor Anthony",
          score: 0,
          answer: { unit: "in", value: 80 },
        },
      },
    },
  },

  answer: {
    detail: "",
    type: 2,
    data: {
      accuracy: 1,
      unit: "cm",
      toUnitWord: {
        plural: "centimeters",
        singular: "centimeter",
      },
      conversion: {
        range: {
          bottom: { unit: "cm", value: 202.2 },
          top: { unit: "cm", value: 204.2 },
        },
        exact: 203.2,
        rounded: 203.2,
        friendly: 203.2,
        choices: [
          { unit: "cm", value: 203.2 },
          { unit: "cm", value: 202.2 },
          { unit: "cm", value: 204.2 },
          { unit: "cm", value: 201.2 },
          { unit: "cm", value: 205.2 },
          { unit: "cm", value: 200.2 },
          { unit: "cm", value: 206.2 },
          { unit: "cm", value: 199.2 },
          { unit: "cm", value: 207.2 },
        ],
      },
      survey: {
        choices: [
          { unit: "in", value: 80 },
          { unit: "in", value: 79 },
          { unit: "in", value: 81 },
          { unit: "in", value: 78 },
          { unit: "in", value: 82 },
          { unit: "in", value: 77 },
          { unit: "in", value: 83 },
          { unit: "in", value: 76 },
          { unit: "in", value: 84 },
        ],
      },
    },
  },
}
```
