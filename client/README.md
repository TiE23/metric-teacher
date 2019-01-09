<h1 align="center">📐🗄🗂🗳📏 metric-teacher Client 📏🗳🗂🗄📐</h1>
This is the documentation for the client side of the metric-teacher project, a ReactJS + Apollo software project.

This is a project conceived and implemented completely by myself, Kyle Geib. UW Bothell educated, Seattle located SDET turned Product Support Engineer turning to eventual JavaScript Full-Stack Developer. I've been a professional programmer since 2013-01-02.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Apollo Boost](https://www.npmjs.com/package/apollo-boost).

# How to Run
## Build CSS
There is a build step required that needs an extra tool: `gulp-cli`.

Install it globally with `npm install -g gulp-cli`.

> The styling of the client uses Semantic-UI, specifically using a ReactJS Component Library [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React).

And with that all you need to do is navigate to `src/semantic` and run `gulp build`. That'll construct the `src/semantic/dist` directory and the necessary css files required to style this site. The scripts also do this for you when running start, but it'll fail unless you have gulp installed.

Alternatively, `yarn build-semantic` can do this for you.

Theming provided through [Semantic-UI-Forest.com](https://semantic-ui-forest.com/themes/).

## Build the React App
This is very easy. Run `yarn build-react` to build the React app.

Alternatively, you can build both CSS and the React app at the same time with `yarn build`.

## Deploy to Docker (Prod)
I never bothered with building to Docker containers during development, so this only shows how to build for AWS situations.

If you have a running Docker container you just need to build:

`docker-compose -f ./docker-compose.yml up -d --build`

Visit the server in your browser and the front page should appear!

# Traefik Reverse-Proxy Config

I'm using Traefik as a method to provide HTTPS security for the client, server, and database.

Traefik is a simple tool that routes traffic through it and works well in Docker containers. It essentially acts as a simple gatekeeper of incoming traffic. When configured a certain way, it will force HTTP traffic to HTTPS. It also has the sweet feature of providing free and automatic SSL certification through Let's Encrypt!

You can access the dashboard by visiting metric-teacher.com/traefik though it may require you to use a new browser to work due to what I assume are caching issues. There is a user name and password requirement.
