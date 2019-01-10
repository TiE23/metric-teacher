# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock ./

# install modules
RUN yarn install

# copy files to work directory (relying on .dockerignore here)
COPY . .
