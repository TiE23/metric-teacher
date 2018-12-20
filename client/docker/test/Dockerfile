# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install serve program
RUN yarn global add serve

# install gulp
RUN yarn global add gulp-cli

# install modules, need to ignore script from semantic-ui
COPY package.json yarn.lock ./
RUN yarn install --ignore-scripts

# copy files to work directory (relying on .dockerignore here)
COPY . .

# build the client
RUN yarn build

EXPOSE 80
