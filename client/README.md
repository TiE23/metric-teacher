<h1 align="center">📐🗄🗂🗳📏 metric-teacher Client 📏🗳🗂🗄📐</h1>
This is the documentation for the client side of the metric-teacher project, a ReactJS + Apollo software project.

This is a project conceived and implemented completely by myself, Kyle Geib. UW Bothell educated, Seattle located SDET turned Product Support Engineer turning to eventual JavaScript Full-Stack Developer. I've been a professional programmer since 2013-01-02.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [Apollo Boost](https://www.npmjs.com/package/apollo-boost).

# How to Run
## CSS Build Steps
There is a build step required that needs an extra tool: `gulp-cli`.

Install it globally with `npm install -g gulp-cli`.

> The styling of the client uses Semantic-UI, specifically using a ReactJS Component Library [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React).

And with that all you need to do is navigate to `src/semantic` and run `gulp build`. That'll construct the `src/semantic/dist` directory and the necessary css files required to style this site. The scripts also do this for you when running start, but it'll fail unless you have gulp installed.

Theming provided through [Semantic-UI-Forest.com](https://semantic-ui-forest.com/themes/).
