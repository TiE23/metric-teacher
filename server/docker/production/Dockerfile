# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install modules
COPY package.json yarn.lock ./
RUN yarn install

# copy files to work directory
COPY . /app

EXPOSE 4000

# start the server (port 4000)
#CMD [ "yarn", "start" ]
# Leave as this until I fix prisma server contact
CMD [ "node", "-r", "dotenv/config", "src/index.js" ]
