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

## Database Documentation
### User
* `id`
* `email`
* `honorific`
    * Optional string for prefixes such as "Mr.", "Mrs.", "Ms.", "Prof.", etc.
* `fname`
    * User's first name.
* `lname`
    * User's last name.
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
* `score`: Scale from 0 to 100
    * A scale between 0 and 100. 0 is the question hasn't been re-answered. Each time the question is answered correctly this value goes up. When the question has hit a certain point (a constant that can be defined, perhaps 50?) then it enters the conversion portion.
* `answer`
    * Answer string recorded from the user's response.
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
    For simplicity rarity is determined by this algorithm:
        * _Generate a random number between 1 and 100. If rarity value is greater than that value it is excluded._
    * Scale
        * `0` or `1` - Common (default value, no chance of it being removed)
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
    * No flags have been defined yet.
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

### Unit
* `id`
* `name`
* `description`
* `subSubjects`
    * Relations to SubSubject rows.

### Scale
* `id`
* `name`
* `description`
* `subSubjects`
    * Relations to SubSubject rows.

## Logic Documentation
### Question/Answer format
Because questions and answers can be a little more nuanced than something simple like "What is freezing temperature in Celsius?" with the answer "0", I had to define a special string formatting language so I could express complex questions and answers into single strings.

*Units*
* Metric (regular)
    * `m` - meter
    * `kg` - kilogram
    * `l` - liter
    * `c` - Celsius
    * `kmph` - kilometers per hour
    * `sqm` - square meter
* Metric (irregular)
    * `ha` - hectare (area), 1 to 10,000 square meters
    * `sqkm` - square kilometer (area), 1 to 100 hectares
* Imperial (regular)
    * `ft` - foot
    * `lb` - pound
    * `gal` - gallon
    * `f` - Fahrenheit
    * `mph` - miles per hour
    * `sqft` - square foot
* Imperial (irregular)
    * `in` - inch, 12 per 1 foot
    * `oz` - ounces (mass), 16 per 1 pound
    * `floz` - ounces (volume), 128 per 1 gallon
    * `acre` - acre (area), 1 to 43,560 square feet
    * `sqmi` - square mile (area), 1 to 640 acres

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
    * `This is a common room temperature. [#-#UNIT(#)s]` (simple, with a written sentence for syntax. Space optional.)
* Range Question (Conversion or Survey)
    * `[#-#UNIT(1)s]` (simple, with whole numbers)
    * `[#-#UNIT(0.1)s]` (with steps of 0.1)
    * `[#-#UNIT(10)s]` (with steps of 10)
    * `[#-#UNIT]` (no steps defined, defaults to 1)
* Range Answer (Conversion or Survey)
    * `[UNIT(1)a]` (simple, with whole numbers)
    * `[UNIT(0.5)a]` (accept an answer within 0.5 units accuracy)
    * `[UNIT(3)a]` (accept an answer within 3 units accuracy)
    * `[UNIT(0)a]` (accept only an exact answer)
    * `[UNIT]` (no accuracy defined, defaults to 1)

Examples:
* Q: `[5-10m(1)s]` A: `[ft(1)a]`
    * Would ask to convert a random whole number of meters between 5 and 10 (inclusive) and demand a conversion in feet accurate to within 1 foot.
* Q: `[18-22c(0.5)s]` A: `[f(2)a]`
    * Would ask to convert a random temperature between 18 and 22 Celsius in 0.5 increments and demand a conversion in Fahrenheit accurate to within 2 degrees.
* Q: `Starting at what height would you describe an adult man to be 'very tall'? [72-79in]` A: `[m(1)a]` User's Survey Answer: `75in`
    * This question accepts a range between 72 to 79 inches (about 1.82 to 2.00m). A survey has four different phases:
        1) It starts by asking the user's opinion (that's when it gets the 75 inch answer).
        2) It asks the user to re-identify their answer from multiple choices. The wrong answers will be generated by randomly displaying +/- 1-4 times the accuracy value `(#)a`. In this case, it might generate the following answers: 75in (correct), +1in (76in), -3in (72in), +3 (78in).
        3) When the user has confirmed their estimate enough times (after hitting a certain threshold tracked through the survey's score field) the survey question will instead ask the person to answer the question in metric with their Imperial answer displayed. Multiple choices will be generated in the same manner as the second phase, simply converted to the Metric value
        4) Finally the same exact case as phase 3 but without showing the user's Imperial answer. (May consider randomly showing or not showing the Imperial answer. Perhaps let the user click on a "your answer is hidden" span that'll show it with perhaps only a small score/mastery penalty).
