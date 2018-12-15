# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY ./package.json ./package.json
RUN yarn install --network-timeout 1000000
RUN yarn global add serve

# copy files to work directory
COPY . .

# build the client
RUN yarn build
#RUN rm -rf ./src

# start the client
CMD [ "serve", "--single", "--port=80", "./build" ]

EXPOSE 80
