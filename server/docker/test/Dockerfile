# base image
FROM node:10.5.0

# set working directory
RUN mkdir -p /app
WORKDIR /app

# copy files to work directory (relying on .dockerignore here)
COPY . .

# install modules
RUN yarn install

# start the server (port 4000)
#CMD [ "yarn", "start" ]
# Leave as this until I fix prisma server contact
CMD [ "node", "-r", "dotenv/config", "src/index.js" ]

EXPOSE 4000
