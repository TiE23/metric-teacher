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
