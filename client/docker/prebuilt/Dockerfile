# This requires running `yarn build` locally before building to a Docker container.
# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install serve program
RUN yarn global add serve

# copy build directory
COPY build build

EXPOSE 80
