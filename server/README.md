## dotenv

There is a secret file that is not in this repo: `.env`
(to be explicit, it's located at `./server/.env`)

This file has a few things that need to be kept secret and a one thing that isn't secret:
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
Type:
* `0` - Student (default)
* `1` - Teacher
* `2` - Moderator
* `3` - Admin

Status:
* `0` - Normal
* `1` - Closed

### Classroom

### Enrollment

### Course

### Mastery

### Survey

### Subject

### SubSubject
Rarity (scale):
* `0` or `1` - Common (default value, no chance of it being removed)
* `50` - Appears half-as-often (1 out of 2 chance of it appearing as often as common questions)
* `100` - Most rare (1 out of 100 chance of it appearing as often as common questions)

A method of reducing the appearance of subsubjects' questions.

This is a site-wide rarity setting that will *NOT* be adustable for different users.
For simplicity rarity is determined by this algorithm:
> Generate a random number between 1 and 100. If rarity value is greater than that value it is excluded.

### Question
Type:
* `0`: Written question. The question is a specific question with a specific answer.
* `1`: Conversion.

Difficulty
Should offer an ability to have some flexibility to give more weight to correct answers for difficult questions and
similarly forgive more for failing to answer them correctly.
* `1`: Easy
* `2`: Easy/Medium
* `3`: Medium (_should be the default_)
* `4`: Medium/Hard
* `5`: Hard

Status:
* `0`: Enabled
* `1`: Disabled

### Unit

### Scale

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
TODO

*Range Syntax*
* Range Question (From):
  * `[#-#UNIT]` (simple, with whole numbers)
  * `[#-#UNIT(0.1)]` (with steps of 0.1)
  * `[#-#UNIT(10)]` (with steps of 10)
* Range Answer (To):
  * `[UNIT]` (simple, with whole numbers)
  * `[UNIT(0.5)]` (accept an answer within 0.5 units accuracy)
  * `[UNIT(3)]` (accept an answer within 3 units accuracy)

Examples:
* Q: `[5-10m]` A: `[ft]`
  * Would ask to convert a random whole number of meters between 5 and 10 (inclusive) and demand a conversion in feet accurate to within 1 foot.
* Q: `[18-22c(0.5)]` A: `[f(2)]`
  * Would ask to convert a random temperature between 18 and 22 Celsius in 0.5 increments and demand a conversion in Fahrenheit accurate to within 2 degrees.
